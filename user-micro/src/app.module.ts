import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [AppConfigModule, UserModule, DatabaseModule],
})
export class AppModule {}
