import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmailModel {
	@IsString()
	@IsNotEmpty()
	public oldEmail: string = null;

	@IsString()
	@IsNotEmpty()
	public newEmail: string = null;

	constructor(init?: Partial<UpdateEmailModel>) {
		Object.assign(this, init);
	}
}
