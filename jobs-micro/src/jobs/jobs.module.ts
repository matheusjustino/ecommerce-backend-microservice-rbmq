import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

// MODULES
import { AppConfigModule } from '../app-config/app-config.module';
import { MailModule } from '../mail/mail.module';

import { JobsController } from './jobs.controller';

// SERVICES
import { AppConfigService } from '../app-config/app-config.service';
import { SendMailProducerService } from './send-mail-producer.service';
import { SendMailConsumerService } from './send-mail-consumer.service';

// INTERFACES
import {
	SEND_MAIL_PRODUCER_SERVICE,
	SEND_MAIL_QUEUE,
} from '../shared/jobs/interfaces/send-mail-producer.service';

@Module({
	imports: [
		BullModule.forRootAsync({
			imports: [AppConfigModule],
			useFactory: (appConfigService: AppConfigService) => ({
				redis: {
					host: appConfigService.bullRedisHost,
					port: appConfigService.bullRedisPort,
				},
			}),
			inject: [AppConfigService],
		}),
		BullModule.registerQueue({
			name: SEND_MAIL_QUEUE,
		}),
		MailModule,
	],
	providers: [
		{
			useClass: SendMailProducerService,
			provide: SEND_MAIL_PRODUCER_SERVICE,
		},
		SendMailConsumerService,
	],
	exports: [
		{
			useClass: SendMailProducerService,
			provide: SEND_MAIL_PRODUCER_SERVICE,
		},
		SendMailConsumerService,
	],
	controllers: [JobsController],
})
export class JobsModule {}
