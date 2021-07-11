// ENUMS
import { UserRole } from '@src/common/enums/user-role.enum';

export class AccountModel {
	public _id: string;
	public role: UserRole;
	public email: string;
	public createdAt: Date;
	public updatedAt: Date;
}
