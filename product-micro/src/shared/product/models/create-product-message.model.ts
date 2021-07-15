export class CreateProductMessageModel {
	public name: string;
	public category: string[];
	public description: string;
	public specification: {
		[key: string]: {};
	}[];
	public price: number;
}
