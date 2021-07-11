import { Observable } from "rxjs";

// MODELS
import { UserModel, UserRegisterModel } from "@src/shared/auth/models/user.model";

export const USER_SERVICE = 'USER_SERVICE';

export interface IUserService {
	createUser(data: UserRegisterModel): Observable<UserModel>
}
