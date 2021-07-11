import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { from as rxjsFrom, Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

// SERVICES
import { HandlebarsMailTemplate } from './handlebars-mail-template.service';
import { AppConfigService } from '../app-config/app-config.service';

// SERVICES INTERFACES
import { IMailService } from '../shared/mail/interfaces/mail.service';

// MODELS
import { SendEmail } from '../shared/mail/models/mail.model';

@Injectable()
export class MailService implements IMailService {
	private logger = new Logger(MailService.name);

	constructor(
		private readonly appConfigService: AppConfigService,
		private readonly handlebarsMailTemplate: HandlebarsMailTemplate,
	) {}

	public sendEmail({
		from: From,
		to,
		subject,
		templateData,
	}: SendEmail): Observable<any> {
		const transporter = nodemailer.createTransport({
			host: this.appConfigService.mailHost,
			port: this.appConfigService.mailPort,
			auth: {
				user: this.appConfigService.mailUser,
				pass: this.appConfigService.mailPass,
			},
		});

		this.logger.log('Send Email - Transporter created');

		return this.handlebarsMailTemplate.parser(templateData).pipe(
			switchMap((file) => {
				return rxjsFrom(
					transporter.sendMail({
						from: {
							name:
								From?.name ||
								this.appConfigService.mailCompanyName ||
								'Equipe de Vendas',
							address:
								From?.email ||
								this.appConfigService.mailCompanyEmail ||
								'equipe@vendas.com.br',
						},
						to: {
							name: to.name,
							address: to.email,
						},
						replyTo:
							From?.email ||
							this.appConfigService.mailCompanyEmail,
						subject,
						html: file,
					}),
				);
			}),
			tap((message) => {
				this.logger.log(`Message sent: ${message.messageId}`);
				this.logger.log(
					`Preview URL: ${nodemailer.getTestMessageUrl(message)}`,
				);
			}),
		);
	}
}
