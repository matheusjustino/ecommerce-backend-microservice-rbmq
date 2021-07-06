import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// RBMQ
import { ClientProxyRbmq } from '@src/proxy-rbmq/client-proxy-rbmq';

// INTERFACES
import { IAuthService } from '@src/shared/interfaces/auth/auth.service';

// MODELS
import {
	AccountModel,
	CreateAccountModel,
	LoginModel,
} from '@src/shared/models/auth/auth.model';

@Injectable()
export class AuthService implements IAuthService {
	private logger = new Logger(AuthService.name);
	private clientProxyAuthMicro: ClientProxy = null;

	constructor(private readonly clientProxyRmq: ClientProxyRbmq) {
		this.clientProxyAuthMicro = this.clientProxyRmq.clientAuthMicro;
	}

	public validateToken(token: string) {
		this.logger.log(`Validate Token - Payload: ${JSON.stringify(token)}`);

		return this.clientProxyAuthMicro.send('validate-token', token).pipe(
			catchError((error) => {
				this.logger.error(`Validate Token Error`);

				return throwError(error);
			}),
		);
	}

	public createAccount(data: CreateAccountModel): Observable<AccountModel> {
		this.logger.log(`Create account - Payload: ${JSON.stringify(data)}`);

		return this.clientProxyAuthMicro.send('register', data);
	}

	public doLogin(data: LoginModel): Observable<{ token: string }> {
		this.logger.log(`Login - Payload: ${JSON.stringify(data)}`);

		return this.clientProxyAuthMicro.send('login', data).pipe(
			catchError((error) => {
				this.logger.error(`Login Error`);

				return throwError(error);
			}),
		);
	}
}
