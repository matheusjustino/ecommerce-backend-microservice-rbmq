import { IsOptional, IsString } from 'class-validator';
export class FindCategoriesMessageModel {
	@IsString()
	@IsOptional()
	public name?: string;
}
