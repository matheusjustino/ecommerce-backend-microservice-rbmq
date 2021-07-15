import { IsArray, IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateProductModel {
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
}
