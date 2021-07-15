import { IsEnum } from 'class-validator';
// ENUMS
import { UserRole } from '@src/common/enums/user-role.enum';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class AccountModel {
	@IsString()
	@IsNotEmpty()
	public _id: string;

	@IsEnum(UserRole, {
		message: `A role deve ser Admin ou Customer.`,
	})
	@IsNotEmpty()
	public role: UserRole;

	@IsString()
	@IsNotEmpty()
	public email: string;

	@IsDate()
	@IsNotEmpty()
	public createdAt: Date;

	@IsDate()
	@IsNotEmpty()
	public updatedAt: Date;
}
