// import { UserDocument } from '@src/database/schemas/account.schema';

export class UserTokenModel {
	public _id?: string;
	public userId: string;
	public used: boolean;
	public createdAt?: string;
	public updatedAt?: string;
}
