import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductModel {
	@IsOptional()
	@IsString()
	public name?: string;

	@IsOptional()
	@IsArray()
	public category: string[];

	@IsOptional()
	@IsString()
	public description?: string;

	@IsOptional()
	@IsArray()
	public specification?: {
		[key: string]: {};
	}[];

	@IsOptional()
	@IsNumber()
	public price?: number;
}
