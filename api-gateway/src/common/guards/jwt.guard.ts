import { catchError, map } from 'rxjs/operators';
import {
	ExecutionContext,
	Injectable,
	CanActivate,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { from, Observable, throwError } from 'rxjs';

import { ClientProxyRbmq } from '../../proxy-rbmq/client-proxy-rbmq';

interface IRequest extends Request {
	token?: string;
	user: any;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
	private logger = new Logger(JwtAuthGuard.name);
	private clientProxyAuthMicro: ClientProxy = null;

	constructor(private readonly clientProxyRmq: ClientProxyRbmq) {
		this.clientProxyAuthMicro = this.clientProxyRmq.clientAuthMicro;
	}

	public canActivate(context: ExecutionContext): Observable<boolean> {
		this.logger.log('JwtAuthGuard - Verify authorization token');

		const req: IRequest = context.switchToHttp().getRequest();

		const authorization = req.headers['authorization'];
		if (!authorization) {
			throw new UnauthorizedException('Token not provide');
		}

		const [, token] = authorization.split(' ');
		if (!token) {
			throw new UnauthorizedException('Token not provide');
		}

		return from(
			this.clientProxyAuthMicro.send('validate-token', token),
		).pipe(
			map((result) => {
				if (!result) {
					throw new UnauthorizedException('Authentication failed');
				}

				const user = { accountId: result._id, email: result.email };
				req.user = user;

				return true;
			}),
			catchError((error) => {
				this.logger.error(
					`JwtAuthGuard Error: ${JSON.stringify(error)}`,
				);

				return throwError(error);
			}),
		);
	}
}
