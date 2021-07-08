import { Module } from '@nestjs/common';

// SERVICES
import { HandlebarsMailTemplate } from './handlebars-mail-template.service';
import { MAIL_SERVICE } from '../shared/mail/interfaces/mail.service';
import { MailService } from './mail.service';
import { AppConfigModule } from '../app-config/app-config.module';

@Module({
	imports: [AppConfigModule],
	providers: [
		{
			useClass: MailService,
			provide: MAIL_SERVICE,
		},
		HandlebarsMailTemplate,
	],
	exports: [
		{
			useClass: MailService,
			provide: MAIL_SERVICE,
		},
		HandlebarsMailTemplate,
	],
})
export class MailModule {}
