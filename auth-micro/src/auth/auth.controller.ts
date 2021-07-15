import { Controller, Inject } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';

// MODELS
import { RegisterModel } from '@src/shared/auth/models/register.model';
import { UserModel } from '@src/shared/auth/models/user.model';
import { LoginModel } from '@src/shared/auth/models/login.model';
import { UpdateUserMessageModel } from '@src/shared/auth/models/update-account-message.model';
import { ResetPasswordModel } from '@src/shared/jobs/mail/mailModel';
import { AccountModel } from '@src/shared/auth/models/account.model';
import { UpdatePasswordMessageModel } from '@src/shared/auth/models/update-password-message.model';
import { UpdateEmailModel } from '@src/shared/user/models/update-email.model';

// SERVICES
import {
	AUTH_SERVICE,
	IAuthService,
} from '@src/shared/auth/interfaces/auth.service';
import { UpdateEmailMessageModel } from '@src/shared/user/models/update-email-message.model';

@Controller('auth')
export class AuthController {
	constructor(
		@Inject(AUTH_SERVICE)
		private readonly authService: IAuthService,
	) {}

	/**
	 * emit -> EventPattern
	 * send -> MessagePattern
	 */

	@MessagePattern('validate-token')
	public validateToken(token: string) {
		return this.authService.validateToken(token);
	}

	@MessagePattern('register')
	public register(registerModel: RegisterModel): Observable<UserModel> {
		return this.authService.register(registerModel);
	}

	@MessagePattern('login')
	public login(login: LoginModel): Observable<{ token: string }> {
		return this.authService.doLogin(login);
	}

	@EventPattern('forgot-password')
	public forgotPassword(data: string): Observable<{ message: string }> {
		return this.authService.sendForgotPasswordEmail(data);
	}

	@MessagePattern('reset-password')
	public resetPassword(
		data: ResetPasswordModel,
	): Observable<{ message: string }> {
		return this.authService.resetPassword(data);
	}

	@EventPattern('update-account')
	public updateAccount(
		data: UpdateUserMessageModel,
	): Observable<AccountModel> {
		return this.authService.updateAccount(data);
	}

	@EventPattern('delete-account')
	public deleteAccount(accountId: string) {
		return this.authService.deleteAccount(accountId);
	}

	@MessagePattern('update-password')
	public updatePassword(data: UpdatePasswordMessageModel) {
		const { accountEmail, updateModel } = data;
		return this.authService.updatePassword(accountEmail, updateModel);
	}

	@MessagePattern('update-email')
	public updateEmail(data: UpdateEmailMessageModel) {
		return this.authService.updateEmail(data);
	}

	@MessagePattern('account-role')
	public accountRole(accountId: string): Observable<string> {
		return this.authService.accountRole(accountId);
	}
}
