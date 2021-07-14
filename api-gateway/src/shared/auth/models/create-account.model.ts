import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

// ENUMS
import { Sex } from '@src/common/enums/sex.enum';

export class CreateAccountModel {
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
	@IsNotEmpty()
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
