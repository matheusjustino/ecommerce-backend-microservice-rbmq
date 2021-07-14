import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// COMMON
import { UserRole } from '@src/common/enums/user-role.enum';

// MODELS
import { AccountModel } from '@src/shared/auth/models/account.model';

@Schema({ timestamps: true })
export class Account implements AccountModel {
	@Prop({ type: String, unique: true })
	public email: string;

	@Prop({ type: String, select: false })
	public password: string;

	@Prop({
		type: UserRole,
		enum: [UserRole.ADMIN, UserRole.CUSTOMER],
		default: UserRole.CUSTOMER,
	})
	public role: UserRole;
}

export type AccountDocument = Account & Document;
export const AccountSchema = SchemaFactory.createForClass(Account);
