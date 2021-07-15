import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// RBMQ
import { ClientProxyRbmq } from '@src/proxy-rbmq/client-proxy-rbmq';

// INTERFACES
import { IAuthService } from '@src/shared/auth/interfaces/auth.service';

// MODELS
import { CreateAccountModel } from '@src/shared/auth/models/create-account.model';
import { AccountModel } from '@src/shared/auth/models/account.model';
import { LoginModel } from '@src/shared/auth/models/login.model';
import { CreateAccountResponseModel } from '@src/shared/auth/models/create-account-response.model';
import { ResetPasswordModel } from '@src/shared/auth/models/reset-password.model';
import { UpdatePasswordMessageModel } from '@src/shared/auth/models/update-password-message.model';
import { UpdateEmailMessageModel } from '@src/shared/user/models/update-email-message.model';

@Injectable()
export class AuthService implements IAuthService {
	private logger = new Logger(AuthService.name);
	private clientProxyAuthMicro: ClientProxy = null;

	constructor(private readonly clientProxyRmq: ClientProxyRbmq) {
		this.clientProxyAuthMicro = this.clientProxyRmq.clientAuthMicro;
	}

	public validateToken(token: string): Observable<AccountModel> {
		this.logger.log(`Validate Token - Payload: ${JSON.stringify(token)}`);

		return this.clientProxyAuthMicro.send('validate-token', token).pipe(
			catchError((error) => {
				this.logger.error(
					`Validate Token Error: ${JSON.stringify(error)}`,
				);

				return throwError(error);
			}),
		);
	}

	public createAccount(
		data: CreateAccountModel,
	): Observable<CreateAccountResponseModel> {
		this.logger.log(`Create account - Payload: ${JSON.stringify(data)}`);

		return this.clientProxyAuthMicro
			.send<CreateAccountResponseModel, CreateAccountModel>(
				'register',
				data,
			)
			.pipe(
				map((res) => {
					console.log(res);
					const userResponse = Object.assign(
						new CreateAccountResponseModel(),
						res,
					);
					return userResponse;
				}),
				catchError((error) => {
					this.logger.error(
						`Create Account Error: ${JSON.stringify(error)}`,
					);

					return throwError(error);
				}),
			);
	}

	public doLogin(data: LoginModel): Observable<{ token: string }> {
		this.logger.log(`Login - Payload: ${JSON.stringify(data)}`);

		return this.clientProxyAuthMicro.send('login', data).pipe(
			catchError((error) => {
				this.logger.error(`Login Error: ${JSON.stringify(error)}`);

				return throwError(error);
			}),
		);
	}

	public forgotPassword(userEmail: string): Observable<{ message: string }> {
		this.logger.log(`Generate Token - Payload: ${userEmail}`);

		return this.clientProxyAuthMicro
			.emit('forgot-password', userEmail)
			.pipe(
				map(() => ({
					message: 'Um email de recuperação de senha será enviado',
				})),
				catchError((error) => {
					this.logger.error(
						`Forgot Password Error: ${JSON.stringify(error)}`,
					);

					return throwError(error);
				}),
			);
	}

	public resetPassword(
		data: ResetPasswordModel,
	): Observable<{ message: string }> {
		this.logger.log(`Reset Password - Payload: ${data}`);

		return this.clientProxyAuthMicro.send('reset-password', data).pipe(
			catchError((error) => {
				this.logger.error(
					`Reset Password Error: ${JSON.stringify(error)}`,
				);

				return throwError(error);
			}),
		);
	}

	public updatePassword(
		data: UpdatePasswordMessageModel,
	): Observable<{ message: string }> {
		this.logger.log(`Update Password - Payload: ${JSON.stringify(data)}`);

		return this.clientProxyAuthMicro.send('update-password', data).pipe(
			catchError((error) => {
				this.logger.error(
					`Update Password Error: ${JSON.stringify(error)}`,
				);

				return throwError(error);
			}),
		);
	}

	public updateEmail(
		data: UpdateEmailMessageModel,
	): Observable<{ message: string }> {
		this.logger.log(`Update Email - Payload: ${JSON.stringify(data)}`);

		return this.clientProxyAuthMicro.send('update-email', data).pipe(
			catchError((error) => {
				this.logger.error(
					`Update Email Error: ${JSON.stringify(error)}`,
				);

				return throwError(error);
			}),
		);
	}
}
