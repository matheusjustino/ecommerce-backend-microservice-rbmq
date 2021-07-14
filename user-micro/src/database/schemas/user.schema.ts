import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// ENUMS
import { Sex } from '../../common/enums/sex.enum';
import { UserRole } from '../../common/enums/user-role.enum';

// MODELS
import { UserModel } from '../../shared/user/models/user.model';

@Schema({ timestamps: true })
export class User implements UserModel {
	@Prop({ type: Types.ObjectId })
	public accountId: string;

	@Prop({ type: String, required: true })
	public firstName: string;

	@Prop({ type: String, required: true })
	public lastName: string;

	@Prop({ type: String, required: true })
	public legalDocument: string;

	@Prop({ type: String, required: true })
	public phone: string;

	@Prop({
		type: Sex,
		enum: [Sex.male, Sex.female, Sex.other],
		required: true,
	})
	public gender: Sex;

	@Prop({ type: String, required: true, unique: true })
	public email: string;

	@Prop({
		type: UserRole,
		enum: [UserRole.ADMIN, UserRole.CUSTOMER],
		default: UserRole.CUSTOMER,
	})
	public role: UserRole;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
