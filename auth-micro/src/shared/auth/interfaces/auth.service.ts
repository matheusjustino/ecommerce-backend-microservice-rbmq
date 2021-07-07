import { Observable } from 'rxjs';

// MODELS
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { UserModel } from '../models/user.model';

export const AUTH_SERVICE = 'AuthService';

export interface IAuthService {
	register(data: RegisterModel): Observable<UserModel>;
	doLogin(data: LoginModel): Observable<{ token: string }>;
	validateToken(token: string): Observable<UserModel>;
}
