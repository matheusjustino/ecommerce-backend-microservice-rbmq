import { Body, Controller, Inject, Post } from '@nestjs/common';

// INTERFACES
import {
	AUTH_SERVICE,
	IAuthService,
} from '@src/shared/interfaces/auth/auth.service';

// MODELS
import {
	CreateAccountModel,
	LoginModel,
} from '@src/shared/models/auth/auth.model';

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
}
