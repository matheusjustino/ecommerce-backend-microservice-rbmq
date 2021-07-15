import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordModel {
	@IsString()
	@IsNotEmpty()
	public token: string;

	@IsString()
	@IsNotEmpty()
	public password: string;
}
