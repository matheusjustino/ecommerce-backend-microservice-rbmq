import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// SCHEMAS
import {
	Category,
	CategoryDocument,
} from '@src/database/schemas/category.schema';

@Injectable()
export class CategoryRepository {
	constructor(
		@InjectModel(Category.name)
		private readonly CategoryModel: Model<CategoryDocument>,
	) {}

	public get categoryModel(): Model<CategoryDocument> {
		return this.CategoryModel;
	}
}
