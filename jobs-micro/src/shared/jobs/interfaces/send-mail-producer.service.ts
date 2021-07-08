import { Observable } from 'rxjs';
import { Job } from 'bull';

import { ForgotPassword, MailContact } from '../../mail/models/mail.model';

export const SEND_MAIL_QUEUE = 'SEND_MAIL_QUEUE';
export const SEND_WELCOME_MAIL_JOB = 'SEND_WELCOME_MAIL_JOB';
export const SEND_FORGOT_PASSWORD_MAIL_JOB = 'SEND_FORGOT_PASSWORD_MAIL_JOB';
export const SEND_MAIL_PRODUCER_SERVICE = 'SEND_MAIL_PRODUCER_SERVICE';

export interface ISendMailProducerService {
	sendWelcomeMail(data: MailContact): Observable<Job<any>>;
	sendForgotPasswordMail(data: ForgotPassword): Observable<Job<any>>;
}
