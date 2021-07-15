export class FindProductsQueryModel {
	public perPage?: number;
	public page?: number;
	public sort?: 'lowest' | 'biggest' | 'new' | 'az' | 'za';
	public price?: string;
	public category?: string;
}
