import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// SCHEMAS
import { User, UserDocument } from '../../database/schemas/user.schema';

@Injectable()
export class UserRepository {
	constructor(
		@InjectModel(User.name)
		private readonly UserModel: Model<UserDocument>,
	) {}

	public get userModel(): Model<UserDocument> {
		return this.UserModel;
	}
}
