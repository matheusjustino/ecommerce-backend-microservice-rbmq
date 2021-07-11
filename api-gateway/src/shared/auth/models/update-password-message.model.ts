import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

// MODELS
import { UpdatePasswordModel } from './update-password.model';

export class UpdatePasswordMessageModel {
	@IsString()
	@IsNotEmpty()
	public accountEmail: string;

	@ValidateNested()
	@Type(() => UpdatePasswordModel)
	@IsNotEmpty()
	public updateModel: UpdatePasswordModel;
}
