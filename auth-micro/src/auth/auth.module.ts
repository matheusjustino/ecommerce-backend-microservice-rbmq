import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// MODULES
import { DatabaseModule } from '@src/database/database.module';
import { AppConfigModule } from '@src/app-config/app-config.module';
import { ProxyRbmqModule } from '@src/proxy-rbmq/proxy-rbmq.module';
import { JobsModule } from '@src/jobs/jobs.module';

// SERVICES
import { AuthService } from './auth.service';
import { AppConfigService } from '@src/app-config/app-config.service';

// CONTROLLERS
import { AuthController } from './auth.controller';

// INTERFACES
import { AUTH_SERVICE } from '@src/shared/auth/interfaces/auth.service';

@Module({
	imports: [
		DatabaseModule,
		PassportModule,
		AppConfigModule,
		ProxyRbmqModule,
		JobsModule,
		JwtModule.registerAsync({
			imports: [AppConfigModule],
			useFactory: (appConfigService: AppConfigService) => ({
				secret: appConfigService.secret,
				signOptions: { expiresIn: '1d' },
			}),
			inject: [AppConfigService],
		}),
	],
	providers: [
		{
			useClass: AuthService,
			provide: AUTH_SERVICE,
		},
	],
	controllers: [AuthController],
	exports: [
		{
			useClass: AuthService,
			provide: AUTH_SERVICE,
		},
	],
})
export class AuthModule {}
