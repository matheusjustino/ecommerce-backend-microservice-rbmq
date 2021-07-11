import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// MODULES
import { DatabaseModule } from '@src/database/database.module';
import { AppConfigModule } from '@src/app-config/app-config.module';
import { ProxyRbmqModule } from '@src/proxy-rbmq/proxy-rbmq.module';
import { JobsModule } from '@src/jobs/jobs.module';
import { UserModule } from '@src/user/user.module';
import { HashModule } from '@src/hash/hash.module';

// SERVICES
import { AppConfigService } from '@src/app-config/app-config.service';

// CONTROLLERS
import { AuthController } from './auth.controller';

// PROVIDERS
import { AuthProviders } from './auth.providers';

@Module({
	imports: [
		DatabaseModule,
		PassportModule,
		AppConfigModule,
		ProxyRbmqModule,
		JobsModule,
		UserModule,
		HashModule,
		JwtModule.registerAsync({
			imports: [AppConfigModule],
			useFactory: (appConfigService: AppConfigService) => ({
				secret: appConfigService.secret,
				signOptions: { expiresIn: '1d', algorithm: 'HS384' },
			}),
			inject: [AppConfigService],
		}),
	],
	controllers: [AuthController],
	providers: [...AuthProviders],
	exports: [...AuthProviders],
})
export class AuthModule {}
