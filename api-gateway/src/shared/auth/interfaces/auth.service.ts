import { Observable } from 'rxjs';

// MODELS
import { LoginModel } from '../models/login.model';
import { AccountModel } from '../models/account.model';
import { CreateAccountModel } from '../models/create-account.model';
import { ResetPasswordModel } from '../models/reset-password.model';
import { CreateAccountResponseModel } from '../models/create-account-response.model';

export const AUTH_SERVICE = 'AuthService';

export interface IAuthService {
	createAccount(
		data: CreateAccountModel,
	): Observable<CreateAccountResponseModel>;
	doLogin(data: LoginModel): Observable<{ token: string }>;
	validateToken(token: string): Observable<AccountModel>
	forgotPassword(userEmail: string): Observable<{ message: string }>;
	resetPassword(data: ResetPasswordModel): Observable<{ message: string }>;
}
