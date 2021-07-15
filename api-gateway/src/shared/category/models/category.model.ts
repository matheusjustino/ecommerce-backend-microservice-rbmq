import {
	IsArray,
	IsDate,
	IsNotEmpty,
	IsOptional,
	IsString,
} from 'class-validator';

export class CategoryModel {
	@IsString()
	@IsOptional()
	public _id?: string;

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

	@IsDate()
	@IsOptional()
	public createdAt?: Date;

	@IsDate()
	@IsOptional()
	public updatedAt?: Date;
}
