import { Module } from '@nestjs/common';

// MODULES
import { AppConfigModule } from './app-config/app-config.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [AppConfigModule, AuthModule],
})
export class AppModule {}
