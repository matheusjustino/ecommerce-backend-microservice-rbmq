import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Controller, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';

// DECORATORS
import { MongoPipeTransform } from '../common/decorators/mongo-pipe-transform.decorator';

// MODELS
import { UpdateUserMessageModel } from '../shared/user/models/update-user-message.model';
import { FindUserQueryModel } from '../shared/user/models/find-user-query.model';
import { FindByIdModel } from '../shared/user/models/find-by-id.model';
import { RegisterModel, UserModel } from '../shared/user/models/user.model';

// INTERFACES
import {
	IUserService,
	USER_SERVICE,
} from '../shared/user/interfaces/user.service';

@Controller('users')
export class UserController {
	constructor(
		@Inject(USER_SERVICE)
		private readonly userService: IUserService,
	) {}

	/**
	 * emit -> EventPattern -> não espera a resposta
	 * send -> MessagePattern -> espera a resposta
	 */

	@MessagePattern('register-user')
	public register(registerModel: RegisterModel): Observable<UserModel> {
		return this.userService.createUser(registerModel);
	}

	@MessagePattern('find-all-users')
	public findAll(@MongoPipeTransform() data: FindUserQueryModel) {
		return this.userService.findAll(data);
	}

	@MessagePattern('find-by-id')
	public findById(data: FindByIdModel) {
		const { accountId, selectPassword } = data;
		return this.userService.findById(accountId, selectPassword);
	}

	@MessagePattern('update-user')
	public update(data: UpdateUserMessageModel) {
		return this.userService.update(data);
	}

	@MessagePattern('delete-user')
	public delete(accountId: string) {
		return this.userService.delete(accountId);
	}

	@EventPattern('update-email')
	public updateEmail(newEmail: string) {
		return this.userService.updateEmail(newEmail);
	}
}
