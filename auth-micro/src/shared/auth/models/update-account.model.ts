import { UserRole } from '@src/common/enums/user-role.enum';

export class UpdateAccountModel {
	public email?: string;
	public password?: string;
	public role?: UserRole;
}
