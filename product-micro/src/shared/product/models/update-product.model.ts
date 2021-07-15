import { CategoryDocument } from '@src/database/schemas/category.schema';

export class UpdateProductModel {
	public name?: string;
	public category?: CategoryDocument[];
	public description?: string;
	public specification?: {
		[key: string]: {};
	}[];
	public price?: number;
}
