export class CategoryModel {
	public _id?: string;
	public name: string;
	public description: string;
	public image: string;
	public customAttributes: any[];
	public createdAt?: Date;
	public updatedAt?: Date;
}
