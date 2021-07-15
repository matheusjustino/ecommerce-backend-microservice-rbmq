import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

// MODELS
import { UpdateCategoryModel } from './update-category.model';

export class UpdateCategoryMessageModel {
	@IsString()
	@IsNotEmpty()
	public categoryId: string;

	@IsNotEmpty()
	@ValidateNested()
	@Type(() => UpdateCategoryModel)
	public updateModel: UpdateCategoryModel;
}
