import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

// RBMQ
import { ClientProxyRbmq } from '@src/proxy-rbmq/client-proxy-rbmq';

// MODELS
import { UserModel } from '@src/shared/user/models/user.model';
import { FindUserQueryModel } from '@src/shared/user/models/find-user-query.model';
import { UpdateUserMessageModel } from '@src/shared/user/models/update-user-message.model';

// INTERFACES
import { IUserService } from '@src/shared/user/interfaces/user.service';

@Injectable()
export class UserService implements IUserService {
	private logger = new Logger(UserService.name);
	private clientProxyUserMicro: ClientProxy = null;

	constructor(private readonly clientProxyRmq: ClientProxyRbmq) {
		this.clientProxyUserMicro = this.clientProxyRmq.clientMicroUsers;
	}

	public updateUser(data: UpdateUserMessageModel): Observable<UserModel> {
		this.logger.log(`Update User - Payload: ${JSON.stringify(data)}`);

		return this.clientProxyUserMicro.send('update-user', data);
	}

	public findAll(query: FindUserQueryModel): Observable<UserModel[]> {
		this.logger.log(`Find all Users - Payload: ${JSON.stringify(query)}`);

		return this.clientProxyUserMicro.send('find-all-users', query);
	}

	public delete(accountId: string): Observable<{ message: string }> {
		this.logger.log(`Delete User - Payload: ${accountId}`);

		return this.clientProxyUserMicro.send('delete-user', accountId);
	}
}
