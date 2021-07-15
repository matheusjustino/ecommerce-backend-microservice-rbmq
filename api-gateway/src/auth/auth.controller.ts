import { Body, Controller, Inject, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

// INTERFACES
import {
	AUTH_SERVICE,
	IAuthService,
} from '@src/shared/auth/interfaces/auth.service';

// MODELS
import { CreateAccountModel } from '@src/shared/auth/models/create-account.model';
import { LoginModel } from '@src/shared/auth/models/login.model';
import { ForgotPasswordModel } from '@src/shared/auth/models/forgot-password.model';
import { ResetPasswordModel } from '@src/shared/auth/models/reset-password.model';
import { UserRequestModel } from '@src/shared/user/models/user-request.model';
import { UpdatePasswordModel } from '@src/shared/auth/models/update-password.model';
import { UpdatePasswordMessageModel } from '@src/shared/auth/models/update-password-message.model';
import { UpdateEmailModel } from '@src/shared/user/models/update-email.model';

// GUARDS
import { JwtAuthGuard } from '@src/common/guards/jwt.guard';

// DECORATORS
import { User } from '@src/common/decorators/user.decorator';

// PIPES
import { UpdatePropertiesValidationPipe } from '@src/common/pipes/update-properties-validation.pipe';
import { UpdateEmailMessageModel } from '@src/shared/user/models/update-email-message.model';

@ApiTags('Auth')
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

	@Post('register')
	@ApiBody({ type: CreateAccountModel })
	public createAccount(@Body() data: CreateAccountModel) {
		return this.authService.createAccount(data);
	}

	@Post('login')
	public doLogin(@Body() data: LoginModel) {
		return this.authService.doLogin(data);
	}

	@Post('forgot-password')
	public forgotPassword(@Body() data: ForgotPasswordModel) {
		return this.authService.forgotPassword(data.email);
	}

	@Post('reset-password')
	public resetPassword(@Body() data: ResetPasswordModel) {
		return this.authService.resetPassword(data);
	}

	@Put('update-password')
	@UseGuards(JwtAuthGuard)
	public updatePassword(
		@User() user: UserRequestModel,
		@Body(UpdatePropertiesValidationPipe) data: UpdatePasswordModel,
	) {
		const payload: UpdatePasswordMessageModel = {
			accountEmail: user.email,
			updateModel: {
				...data,
			},
		};

		return this.authService.updatePassword(payload);
	}

	@Put('update-email')
	@UseGuards(JwtAuthGuard)
	public updateEmail(
		@User() user: UserRequestModel,
		@Body(UpdatePropertiesValidationPipe) body: UpdateEmailModel,
	) {
		const payload: UpdateEmailMessageModel = {
			accountId: user.accountId,
			updateModel: body,
		};

		return this.authService.updateEmail(payload);
	}
}
