import { IsOptional, IsString } from 'class-validator';

export class FindProductsQueryModel {
	@IsOptional()
	@IsString()
	public perPage?: string;

	@IsOptional()
	@IsString()
	public page?: string;

	@IsOptional()
	@IsString()
	public sort?: 'lowest' | 'biggest' | 'new' | 'az' | 'za';

	@IsOptional()
	@IsString()
	public price?: string;

	@IsOptional()
	@IsString()
	public category?: string;
}
