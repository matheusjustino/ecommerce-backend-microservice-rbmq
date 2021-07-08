import { Body, Controller, Inject, Post } from '@nestjs/common';

// INTERFACES
import {
	AUTH_SERVICE,
	IAuthService,
} from '@src/shared/auth/interfaces/auth.service';

// MODELS
import { CreateAccountModel } from '@src/shared/auth/models/create-account.model';
import { LoginModel } from '@src/shared/auth/models/login.model';

@Controller('auth')
export class AuthController {
	constructor(
		@Inject(AUTH_SERVICE)
		private readonly authService: IAuthService,
	) {}

	@Post('register')
	public createAccount(@Body() data: CreateAccountModel) {
		return this.authService.createAccount(data);
	}

	@Post('login')
	public doLogin(@Body() data: LoginModel) {
		return this.authService.doLogin(data);
	}

	@Post('forgot-password')
	public forgotPassword(@Body() data) {
		return this.authService.forgotPassword(data.email);
	}

	@Post('reset-password')
	public resetPassword(@Body() data) {
		return this.authService.resetPassword(data);
	}
}
