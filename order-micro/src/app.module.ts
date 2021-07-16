import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';

@Module({
	imports: [AppConfigModule],
})
export class AppModule {}
