import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

// ENUMS
import { Sex } from '@src/common/enums/sex.enum';
import { UserRole } from '@src/common/enums/user-role.enum';

export class UserModel {
	public _id: string;
	public firstName: string;
	public lastName: string;
	public legalDocument: string;
	public phone: string;
	public gender: Sex;
	public email: string;
	public password: string;
	public confirmPassword: string;
	public role: UserRole;
	public createdAt: Date;
	public updatedAt: Date;
}

export class RegisterModel {
	@IsNotEmpty()
	@IsString()
	public firstName: string;

	@IsNotEmpty()
	@IsString()
	public lastName: string;

	@IsNotEmpty()
	@IsString()
	public legalDocument: string;

	@IsNotEmpty()
	@IsString()
	public phone: string;

	@IsEnum(Sex, {
		message: `O gênero deve ser Male, Female ou Other.`,
	})
	public gender: Sex;

	@IsNotEmpty()
	@IsString()
	public email: string;

	@IsNotEmpty()
	@IsString()
	public password: string;

	@IsNotEmpty()
	@IsString()
	public confirmPassword: string;
}

export class LoginModel {
	@IsNotEmpty()
	@IsString()
	public email: string;

	@IsNotEmpty()
	@IsString()
	public password: string;

	@IsNotEmpty()
	@IsString()
	public confirmPassword: string;
}
