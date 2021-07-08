import { Observable } from 'rxjs';
import { SendEmail } from '../models/mail.model';

export const MAIL_SERVICE = 'MAIL SERVICE';

export interface IMailService {
	sendEmail(data: SendEmail): Observable<any>;
}
