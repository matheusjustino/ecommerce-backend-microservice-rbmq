import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

// MODELS
import { ForgotPassword, MailContact } from '../shared/mail/models/mail.model';

// SERVICES
import {
	ISendMailProducerService,
	SEND_MAIL_PRODUCER_SERVICE,
} from '../shared/jobs/interfaces/send-mail-producer.service';

@Controller('jobs')
export class JobsController {
	constructor(
		@Inject(SEND_MAIL_PRODUCER_SERVICE)
		private readonly sendMailProducerService: ISendMailProducerService,
	) {}

	@MessagePattern('send-welcome-email')
	public sendWelcomeMail(data: MailContact) {
		return this.sendMailProducerService.sendWelcomeMail(data);
	}

	@MessagePattern('send-forgot-password-email')
	public sendForgotPasswordEmail(data: ForgotPassword) {
		return this.sendMailProducerService.sendForgotPasswordMail(data);
	}
}
