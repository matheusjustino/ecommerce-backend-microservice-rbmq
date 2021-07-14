// ENUMS
import { Sex } from '../../../common/enums/sex.enum';
import { UserRole } from '../../../common/enums/user-role.enum';

export class UserModel {
	public _id?: string;
	public accountId: string;
	public firstName: string;
	public lastName: string;
	public legalDocument: string;
	public phone: string;
	public gender: Sex;
	public email: string;
	public role: UserRole;
	public createdAt?: Date;
	public updatedAt?: Date;
}

export class RegisterModel {
	public accountId: string;
	public firstName: string;
	public lastName: string;
	public legalDocument: string;
	public phone: string;
	public gender: Sex;
	public email: string;
	public password: string;
	public role: UserRole;
}

export class RegisterResponseModel {
	public _id?: string;
	public accountId: string;
	public firstName: string;
	public lastName: string;
	public legalDocument: string;
	public phone: string;
	public gender: Sex;
	public email: string;
	public role: UserRole;
	public createdAt?: Date;
	public updatedAt?: Date;
}
