// ENUMS
import { Sex } from '@src/common/enums/sex.enum';

export class RegisterModel {
	public firstName: string;
	public lastName: string;
	public legalDocument: string;
	public phone: string;
	public gender: Sex;
	public email: string;
	public password: string;
	public confirmPassword: string;
}
