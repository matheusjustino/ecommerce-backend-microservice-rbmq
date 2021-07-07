import { IsNotEmpty, IsString } from 'class-validator';

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
