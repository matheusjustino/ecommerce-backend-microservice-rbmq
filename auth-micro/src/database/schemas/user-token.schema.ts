import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// MODELS
import { UserTokenModel } from '@src/shared/auth/models/user-token.model';

@Schema({ timestamps: true })
export class UserToken implements UserTokenModel {
	@Prop({ type: String })
	public userId: string;

	@Prop({ type: Boolean, default: false })
	public used: boolean;
}

export type UserTokenDocument = UserToken & Document;
export const UserTokenSchema = SchemaFactory.createForClass(UserToken);
