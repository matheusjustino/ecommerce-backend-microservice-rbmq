import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryModel {
	@IsString()
	@IsOptional()
	public name?: string;

	@IsString()
	@IsOptional()
	public description?: string;

	@IsString()
	@IsOptional()
	public image?: string;

	@IsString()
	@IsArray()
	public customAttributes?: any[];
}
