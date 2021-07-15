import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

// MODELS
import { UpdateUserModel } from './update-user.model';

export class UpdateUserMessageModel {
	@IsNotEmpty()
	@IsString()
	public accountId: string = null;

	@ValidateNested()
	@Type(() => UpdateUserModel)
	@IsNotEmpty()
	public updateModel: UpdateUserModel = null;

	constructor(init?: Partial<UpdateUserMessageModel>) {
		Object.assign(this, init);
	}
}
