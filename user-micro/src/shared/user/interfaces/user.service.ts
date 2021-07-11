import { Observable } from 'rxjs';

// MODELS
import { UpdateUserMessageModel } from '../models/update-user-message.model';
import { FindUserQueryModel } from '../models/find-user-query.model';
import { RegisterModel, UserModel } from '../models/user.model';

export const USER_SERVICE = 'USER_SERVICE';

export interface IUserService {
	createUser(register: RegisterModel): Observable<UserModel>
	findAll(query: FindUserQueryModel): Observable<UserModel[]>;
	findById(
		accountId: string,
		selectPassword: boolean,
	): Observable<UserModel>
	update(data: UpdateUserMessageModel): Observable<UserModel>;
	delete(userId: string): Observable<{ message: string }>;
}
