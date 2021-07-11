import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// SCHEMAS
import {
	UserToken,
	UserTokenDocument,
} from '../../database/schemas/user-token.schema';

@Injectable()
export class UserTokenRepository {
	constructor(
		@InjectModel(UserToken.name)
		private readonly UserTokenModel: Model<UserTokenDocument>,
	) {}

	public get userTokenModel(): Model<UserTokenDocument> {
		return this.UserTokenModel;
	}
}
