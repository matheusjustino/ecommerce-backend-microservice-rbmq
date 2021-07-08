import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { uuid } from 'uuidv4';

// MODELS
import { UserTokenModel } from '@src/shared/auth/models/user-token.model';
import { UserDocument } from './user.schema';

@Schema({ timestamps: true })
export class UserToken implements UserTokenModel {
	@Prop({ type: String, default: uuid() })
	public token: string;

	@Prop({ type: Types.ObjectId })
	public userId: UserDocument;

	@Prop({ type: Boolean, default: false })
	public used: boolean;
}

export type UserTokenDocument = UserToken & Document;
export const UserTokenSchema = SchemaFactory.createForClass(UserToken);
