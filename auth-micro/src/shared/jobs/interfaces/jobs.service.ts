import { Observable } from "rxjs";

// MODELS
import { ForgotPasswordModel, MailContact } from "../mail/mailModel";

export const JOBS_SERVICE = 'JOBS_SERVICE';

export interface IJobsService {
	sendWelcomeEmail(data: MailContact): Observable<void>;
	sendForgotPasswordEmail(data: ForgotPasswordModel): Observable<void>;
}
