import { Observable } from 'rxjs';

// MODELS
import { UpdateUserModel } from '../models/update-user.model';
import { UserModel } from '../models/user.model';

export const USER_SERVICE = 'USER_SERVICE';

export interface IUserService {
	getAll(): Observable<UserModel>;
	getById(userId: string): Observable<UserModel[]>;
	update(userId: string, data: UpdateUserModel): Observable<UserModel>;
	delete(userId: string): Observable<UserModel>;
}
