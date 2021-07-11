import { Observable } from 'rxjs';

// MODELS
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { UserModel } from '../models/user.model';
import { ResetPasswordModel } from '@src/shared/jobs/mail/mailModel';
import { AccountModel } from '../models/account.model';
import { UpdateUserMessageModel } from '../models/update-account-message.model';

export const AUTH_SERVICE = 'AuthService';

export interface IAuthService {
	register(data: RegisterModel): Observable<UserModel>;
	doLogin(data: LoginModel): Observable<{ token: string }>;
	validateToken(token: string): Observable<AccountModel>;
	sendForgotPasswordEmail(userEmail: string): Observable<{ message: string }>;
	resetPassword(data: ResetPasswordModel): Observable<{ message: string }>;
	updateAccount(data: UpdateUserMessageModel): Observable<AccountModel>;
	deleteAccount(accountId: string): Observable<{ message: string }>;
}
