import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from './app-config-options';
import { AppConfigService } from './app-config.service';

@Module({
	imports: [ConfigModule.forRoot(configOptions)],
	providers: [AppConfigService],
	exports: [AppConfigService],
})
export class AppConfigModule {}
