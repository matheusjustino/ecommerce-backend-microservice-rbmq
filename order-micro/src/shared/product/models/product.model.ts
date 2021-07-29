import { CategoryModel } from '@src/shared/category/models/category.model';

export class ProductModel {
	public _id?: string;
	public name: string;
	public category: CategoryModel[];
	public description: string;
	public specification: {
		[key: string]: {};
	}[];
	public price: number;
	public createdAt?: Date;
	public updatedAt?: Date;
}
