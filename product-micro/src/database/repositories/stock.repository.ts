import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// SCHEMAS
import { Stock, StockDocument } from '../schemas/stock.schema';

@Injectable()
export class StockRepository {
	constructor(
		@InjectModel(Stock.name)
		private readonly StockModel: Model<StockDocument>,
	) {}

	public get stockModel(): Model<StockDocument> {
		return this.StockModel;
	}
}
