import { Observable } from 'rxjs';
import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

// RBMQ
import { ClientProxyRbmq } from '@src/proxy-rbmq/client-proxy-rbmq';

// MODELS
import {
	UserRegisterModel,
	UserModel,
} from '@src/shared/auth/models/user.model';

// INTERFACES
import { IUserService } from '@src/shared/user/interfaces/user.service';

@Injectable()
export class UserService implements IUserService {
	private logger = new Logger(`API-GATEWAY: ${UserService.name}`);
	private clientProxyUsersMicro: ClientProxy = null;

	constructor(private readonly clientProxyRbmq: ClientProxyRbmq) {
		this.clientProxyUsersMicro = this.clientProxyRbmq.clientMicroUsers;
	}

	public createUser(data: UserRegisterModel): Observable<UserModel> {
		this.logger.log(`Create User - Payload: ${JSON.stringify(data)}`);

		return this.clientProxyUsersMicro.send('register-user', data);
	}

	public updateEmail(newEmail: string) {
		this.logger.log(`Update Email - Payload: ${JSON.stringify(newEmail)}`);

		return this.clientProxyUsersMicro.emit('update-email', newEmail);
	}
}
