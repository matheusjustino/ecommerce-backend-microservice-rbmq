import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// RBMQ
import { ClientProxyRbmq } from '@src/proxy-rbmq/client-proxy-rbmq';

// INTERFACES
import { IAuthService } from '@src/shared/auth/interfaces/auth.service';

// MODELS
import { CreateAccountModel } from '@src/shared/auth/models/create-account.model';
import { AccountModel } from '@src/shared/auth/models/account.model';
import { LoginModel } from '@src/shared/auth/models/login.model';

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

	public forgotPassword(userEmail: string) {
		this.logger.log(`Generate Token - Payload: ${userEmail}`);

		return this.clientProxyAuthMicro
			.send('forgot-password', userEmail)
			.pipe(
				catchError((error) => {
					this.logger.error(`Forgot Password Error`);

					return throwError(error);
				}),
			);
	}

	public resetPassword(data) {
		this.logger.log(`Reset Password - Payload: ${data}`);

		return this.clientProxyAuthMicro.send('reset-password', data).pipe(
			catchError((error) => {
				this.logger.error(`Reset Password Error`);

				return throwError(error);
			}),
		);
	}
}
