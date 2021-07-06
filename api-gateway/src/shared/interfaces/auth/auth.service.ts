import { Observable } from 'rxjs';
import {
	AccountModel,
	CreateAccountModel,
	LoginModel,
} from '@src/shared/models/auth/auth.model';

export const AUTH_SERVICE = 'AuthService';

export interface IAuthService {
	createAccount(data: CreateAccountModel): Observable<AccountModel>;
	doLogin(data: LoginModel): Observable<{ token: string }>;
	validateToken(token: string): Observable<any>;
}
