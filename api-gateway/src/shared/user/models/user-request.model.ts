import { IsNotEmpty, IsString } from 'class-validator';

export class UserRequestModel {
	@IsNotEmpty()
	@IsString()
	public accountId: string;

	@IsString()
	@IsNotEmpty()
	public email: string;
}
