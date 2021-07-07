import { Observable } from 'rxjs';

// MODELS
import { AccountModel } from '../models/account.model';
import { CreateAccountModel } from '../models/create-account.model';
import { LoginModel } from '../models/login.model';

export const AUTH_SERVICE = 'AuthService';

export interface IAuthService {
	createAccount(data: CreateAccountModel): Observable<AccountModel>;
	doLogin(data: LoginModel): Observable<{ token: string }>;
	validateToken(token: string): Observable<any>;
}
