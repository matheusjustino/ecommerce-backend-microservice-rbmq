import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';

// MODELS
import { RegisterModel } from '@src/shared/auth/models/register.model';
import { UserModel } from '@src/shared/auth/models/user.model';
import { LoginModel } from '@src/shared/auth/models/login.model';

// SERVICES
import {
	AUTH_SERVICE,
	IAuthService,
} from '@src/shared/auth/interfaces/auth.service';
import { ResetPasswordModel } from '@src/shared/jobs/mail/mailModel';

@Controller('auth')
export class AuthController {
	constructor(
		@Inject(AUTH_SERVICE)
		private readonly authService: IAuthService,
	) {}

	@EventPattern('validate-token')
	public validateToken(token: string) {
		return this.authService.validateToken(token);
	}

	@EventPattern('register')
	public register(registerModel: RegisterModel): Observable<UserModel> {
		return this.authService.register(registerModel);
	}

	@EventPattern('login')
	public login(login: LoginModel): Observable<{ token: string }> {
		return this.authService.doLogin(login);
	}

	@EventPattern('forgot-password')
	public forgotPassword(data: string): Observable<{ message: string }> {
		return this.authService.sendForgotPasswordEmail(data);
	}

	@EventPattern('reset-password')
	public resetPassword(data: ResetPasswordModel) {
		return this.authService.resetPassword(data);
	}
}
