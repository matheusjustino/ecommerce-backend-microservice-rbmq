import { AsyncModelFactory } from '@nestjs/mongoose';

// SCHEMAS
import { Product, ProductSchema } from './schemas/product.schema';
import { Category, CategorySchema } from './schemas/category.schema';
import { Stock, StockSchema } from './schemas/stock.schema';

export const ModelsProviderAsync: AsyncModelFactory[] = [
	{
		name: Product.name,
		collection: 'products',
		useFactory: () => ProductSchema,
	},
	{
		name: Category.name,
		collection: 'categories',
		useFactory: () => CategorySchema,
	},
	{
		name: Stock.name,
		collection: 'stock',
		useFactory: () => StockSchema,
	},
];
