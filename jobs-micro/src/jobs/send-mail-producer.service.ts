import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { from, Observable } from 'rxjs';
import { Queue, Job } from 'bull';

// MODELS
import { ForgotPassword, MailContact } from '../shared/mail/models/mail.model';

// SERVICES INTERFACE
import {
	ISendMailProducerService,
	SEND_FORGOT_PASSWORD_MAIL_JOB,
	SEND_MAIL_QUEUE,
	SEND_WELCOME_MAIL_JOB,
} from '../shared/jobs/interfaces/send-mail-producer.service';

@Injectable()
export class SendMailProducerService implements ISendMailProducerService {
	private logger = new Logger(SendMailProducerService.name);

	constructor(
		@InjectQueue(SEND_MAIL_QUEUE) private readonly mailQueue: Queue,
	) {}

	public sendWelcomeMail(data: MailContact): Observable<Job<any>> {
		this.logger.log(`Send Welcome Mail - Payload: ${JSON.stringify(data)}`);

		return from(
			this.mailQueue.add(SEND_WELCOME_MAIL_JOB, data, {
				delay: 2000,
				attempts: 2,
			}),
		);
	}

	public sendForgotPasswordMail(data: ForgotPassword): Observable<Job<any>> {
		this.logger.log(
			`Send Forgot Password Mail - Payload: ${JSON.stringify(data)}`,
		);

		return from(
			this.mailQueue.add(SEND_FORGOT_PASSWORD_MAIL_JOB, data, {
				delay: 2000,
				attempts: 2,
			}),
		);
	}
}
