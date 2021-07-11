import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { ProxyRbmqModule } from './proxy-rbmq/proxy-rbmq.module';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';
import { HashModule } from './hash/hash.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		AppConfigModule,
		DatabaseModule,
		ProxyRbmqModule,
		AuthModule,
		JobsModule,
		HashModule,
		UserModule,
	],
})
export class AppModule {}
