import { Module } from '@nestjs/common';

import { AppConfigModule } from './app-config/app-config.module';
import { MailModule } from './mail/mail.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
	imports: [AppConfigModule, MailModule, JobsModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
