import { Module } from '@nestjs/common';

// CONTROLLERS
import { AuthController } from './auth.controller';

// SERVICES
import { AuthService } from './auth.service';

// INTERFACES
import { AUTH_SERVICE } from '@src/shared/interfaces/auth/auth.service';

@Module({
	controllers: [AuthController],
	providers: [
		{
			useClass: AuthService,
			provide: AUTH_SERVICE,
		},
	],
	exports: [
		{
			useClass: AuthService,
			provide: AUTH_SERVICE,
		},
	],
})
export class AuthModule {}
