import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryMessageModel {
	@IsString()
	@IsNotEmpty()
	public name: string;

	@IsString()
	@IsNotEmpty()
	public description: string;

	@IsString()
	@IsNotEmpty()
	public image: string;

	@IsArray()
	@IsNotEmpty()
	public customAttributes: any[];
}
