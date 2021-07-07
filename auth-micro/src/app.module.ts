import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { ProxyRbmqModule } from './proxy-rbmq/proxy-rbmq.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [AppConfigModule, DatabaseModule, ProxyRbmqModule, AuthModule],
})
export class AppModule {}
