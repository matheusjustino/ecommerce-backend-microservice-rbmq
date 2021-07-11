import { UserRole } from '@src/common/enums/user-role.enum';

export class AccountModel {
	public _id?: string;
	public email: string;
	public password: string;
	public role: UserRole;
	public createdAt?: Date;
	public updatedAt?: Date;
}
