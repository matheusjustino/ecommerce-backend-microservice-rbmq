import {
	IsArray,
	IsDate,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class ProductModel {
	@IsOptional()
	@IsString()
	public _id?: string;

	@IsNotEmpty()
	@IsString()
	public name: string;

	@IsNotEmpty()
	@IsArray()
	public category: string[];

	@IsNotEmpty()
	@IsString()
	public description: string;

	@IsNotEmpty()
	@IsArray()
	public specification: {
		[key: string]: {};
	}[];

	@IsNotEmpty()
	@IsNumber()
	public price: number;

	@IsOptional()
	@IsDate()
	public createdAt?: Date;

	@IsOptional()
	@IsDate()
	public updatedAt?: Date;
}
