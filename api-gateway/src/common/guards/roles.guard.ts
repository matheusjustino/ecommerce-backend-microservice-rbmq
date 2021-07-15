import { map } from 'rxjs/operators';
import {
	Injectable,
	CanActivate,
	ExecutionContext,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { from, Observable, of } from 'rxjs';

// RBMQ
import { ClientProxyRbmq } from '@src/proxy-rbmq/client-proxy-rbmq';

@Injectable()
export class RolesGuard implements CanActivate {
	private logger = new Logger(RolesGuard.name);
	private clientProxyAuthMicro: ClientProxy = null;

	constructor(
		private readonly reflector: Reflector,
		private readonly clientProxyRmq: ClientProxyRbmq,
	) {
		this.clientProxyAuthMicro = this.clientProxyRmq.clientAuthMicro;
	}

	public canActivate(context: ExecutionContext): Observable<boolean> {
		this.logger.log(`Verify account role`);

		const roles = this.reflector.get<string[]>(
			'roles',
			context.getHandler(),
		);
		if (!roles) {
			return of(true);
		}

		const { user } = context.switchToHttp().getRequest();

		return from(
			this.clientProxyAuthMicro.send('account-role', user.accountId),
		).pipe(
			map((role) => {
				if (!role) {
					throw new UnauthorizedException('Insufficient permissions');
				}

				const hasPermission = user && this.hasRole(roles, role);

				if (!hasPermission) {
					throw new UnauthorizedException('Insufficient permissions');
				}

				return hasPermission;
			}),
		);
	}

	private hasRole(roles: string[], role: string): boolean {
		return roles.indexOf(role) > -1;
	}
}
