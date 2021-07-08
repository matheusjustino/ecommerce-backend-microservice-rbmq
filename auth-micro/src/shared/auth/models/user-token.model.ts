import { UserDocument } from '@src/database/schemas/user.schema';

export class UserTokenModel {
	public _id?: string;
	public token: string;
	public userId: UserDocument;
	public used: boolean;
	public createdAt?: string;
	public updatedAt?: string;
}
