export class ProductModel {
	public _id?: string;
	public name: string;
	public category: string[];
	public description: string;
	public specification: {
		[key: string]: {};
	}[];
	public price: number;
	public createdAt?: Date;
	public updatedAt?: Date;
}
