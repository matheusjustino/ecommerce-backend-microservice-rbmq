import { Observable } from 'rxjs';
import {
	RegisterModel,
	UserModel,
	LoginModel,
} from '@src/shared/auth/auth.model';

export const AUTH_SERVICE = 'AuthService';

export interface IAuthService {
	register(data: RegisterModel): Observable<UserModel>;
	doLogin(data: LoginModel): Observable<{ token: string }>;
	validateToken(token: string): Observable<any>;
}
