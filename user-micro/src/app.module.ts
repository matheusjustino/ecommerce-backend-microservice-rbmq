import { Module } from '@nestjs/common';

import { AppConfigModule } from './app-config/app-config.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ProxyRbmqModule } from './proxy-rbmq/proxy-rbmq.module';

@Module({
	imports: [AppConfigModule, DatabaseModule, ProxyRbmqModule, UserModule],
})
export class AppModule { }
