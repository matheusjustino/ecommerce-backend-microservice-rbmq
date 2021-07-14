import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordModel {
	@IsString()
	@IsNotEmpty()
	public yourPassword: string = null;

	@IsString()
	@IsNotEmpty()
	public newPassword: string = null;

	@IsString()
	@IsNotEmpty()
	public confirmNewPassword: string = null;

	constructor(init?: Partial<UpdatePasswordModel>) {
		Object.assign(this, init);
	}
}
