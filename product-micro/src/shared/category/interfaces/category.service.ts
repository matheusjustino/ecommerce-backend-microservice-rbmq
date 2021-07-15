import { Observable } from 'rxjs';

// MODELS
import { CategoryModel } from '../models/category.model';
import { CreateCategoryMessageModel } from '../models/create-category-message.model';
import { UpdateCategoryMessageModel } from '../models/update-category-message.model';

export const CATEGORY_SERVICE = 'CATEGORY_SERVICE';

export interface ICategoryService {
	createCategory(data: CreateCategoryMessageModel): Observable<CategoryModel>;
	updateCategory(data: UpdateCategoryMessageModel): Observable<CategoryModel>;
	findAll(query?): Observable<CategoryModel[]>;
	findById(categoryId: string): Observable<CategoryModel>;
	deleteCategory(categoryId: string): Observable<CategoryModel>;
}
