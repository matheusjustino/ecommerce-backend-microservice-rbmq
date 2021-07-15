import { Observable } from 'rxjs';

// MODELS
import { UpdateUserMessageModel } from '@src/shared/user/models/update-user-message.model';
import { FindUserQueryModel } from '@src/shared/user/models/find-user-query.model';
import { UserModel } from '@src/shared/user/models/user.model';

export const USER_SERVICE = 'USER_SERVICE';

export interface IUserService {
	updateUser(data: UpdateUserMessageModel): Observable<UserModel>;
	findAll(query: FindUserQueryModel): Observable<UserModel[]>;
	delete(accountId: string): Observable<{ message: string }>;
}
