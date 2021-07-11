import { Module } from '@nestjs/common';

// MODULES
import { AppConfigModule } from './app-config/app-config.module';
import { AuthModule } from './auth/auth.module';
import { ProxyRbmqModule } from './proxy-rbmq/proxy-rbmq.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [AppConfigModule, AuthModule, ProxyRbmqModule, UserModule],
})
export class AppModule {}
