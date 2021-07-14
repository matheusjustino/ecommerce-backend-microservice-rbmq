import { IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordModel {
	@IsString()
	@IsNotEmpty()
	public email: string;
}
