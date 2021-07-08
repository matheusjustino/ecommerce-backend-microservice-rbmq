import { Process, Processor } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { join } from 'path';
import { Job } from 'bull';

// INTERFACES
import {
	IMailService,
	MAIL_SERVICE,
} from '../shared/mail/interfaces/mail.service';
import {
	SEND_FORGOT_PASSWORD_MAIL_JOB,
	SEND_MAIL_QUEUE,
	SEND_WELCOME_MAIL_JOB,
} from '../shared/jobs/interfaces/send-mail-producer.service';

// MODELS
import {
	ForgotPassword,
	MailContact,
	SendEmail,
} from '../shared/mail/models/mail.model';

@Processor(SEND_MAIL_QUEUE)
export class SendMailConsumerService {
	private logger = new Logger(SendMailConsumerService.name);

	constructor(
		@Inject(MAIL_SERVICE)
		private readonly mailService: IMailService,
	) {}

	@Process(SEND_WELCOME_MAIL_JOB)
	public sendWelcomeEmailJob(job: Job<MailContact>): void {
		this.logger.log(
			`Send Welcome Email Job - Payload: ${JSON.stringify(job.data)}`,
		);

		const { data } = job;

		const welcomeTemplate = join(
			process.cwd(),
			'src/mail/views/welcome.hbs',
		);

		const sendMail: SendEmail = {
			to: data,
			subject: '[EQUIPE DE VENDAS] Bem-Vindo(a)',
			templateData: {
				file: welcomeTemplate,
				variables: {
					name: data.name,
				},
			},
		};

		this.mailService.sendEmail(sendMail).subscribe();
	}

	@Process(SEND_FORGOT_PASSWORD_MAIL_JOB)
	public sendForgotPasswordMailJob(job: Job<ForgotPassword>): void {
		this.logger.log(
			`Send Forgot Password Email Job - Payload: ${JSON.stringify(
				job.data,
			)}`,
		);

		const { data } = job;

		const forgotPasswordTemplate = join(
			process.cwd(),
			'src/mail/views/forgot_password.hbs',
		);

		const sendMail: SendEmail = {
			to: data.to,
			subject: '[API VENDAS] Recuperação de Email',
			templateData: {
				file: forgotPasswordTemplate,
				variables: {
					name: data.to.name,
					link: `http://localhost:3000/reset-password?token=${data.token}`,
				},
			},
		};

		this.mailService.sendEmail(sendMail).subscribe();
	}
}
