import {
	IsDate,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
} from 'class-validator';

// ENUMS
import { Sex } from '@src/common/enums/sex.enum';
import { UserRole } from '@src/common/enums/user-role.enum';

export class CreateAccountResponseModel {
	@IsOptional()
	@IsNotEmpty()
	public _id?: string;

	@IsString()
	@IsNotEmpty()
	public accountId: string;

	@IsString()
	@IsNotEmpty()
	public firstName: string;

	@IsString()
	@IsNotEmpty()
	public lastName: string;

	@IsString()
	@IsNotEmpty()
	public legalDocument: string;

	@IsString()
	@IsNotEmpty()
	public phone: string;

	@IsEnum(Sex, {
		message: `O gênero deve ser Male, Female ou Other.`,
	})
	@IsNotEmpty()
	public gender: Sex;

	@IsString()
	@IsNotEmpty()
	public email: string;

	@IsEnum(UserRole, {
		message: `A role deve ser Admin ou Customer.`,
	})
	@IsNotEmpty()
	public role: UserRole;

	@IsDate()
	@IsNotEmpty()
	public createdAt?: Date;

	@IsDate()
	@IsNotEmpty()
	public updatedAt?: Date;
}
