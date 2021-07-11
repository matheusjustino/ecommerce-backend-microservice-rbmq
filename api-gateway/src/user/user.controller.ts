import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Put,
	Query,
} from '@nestjs/common';
import { Observable } from 'rxjs';

// MODELS
import { UserModel } from '@src/shared/user/models/user.model';
import { UpdateUserModel } from '@src/shared/user/models/update-user.model';
import { FindUserQueryModel } from '@src/shared/user/models/find-user-query.model';
import { UpdateUserMessageModel } from '@src/shared/user/models/update-user-message.model';

// INTERFACES
import { IUserService, USER_SERVICE } from '@src/shared/user/interfaces/user.service';

@Controller('users')
export class UserController {
	constructor(
		@Inject(USER_SERVICE)
		private readonly userService: IUserService) { }

	@Get()
	public findAll(@Query() query: FindUserQueryModel): Observable<UserModel[]> {
		return this.userService.findAll(query);
	}

	@Put(':id')
	public update(@Param('id') id: string, @Body() body: UpdateUserModel): Observable<UserModel> {
		const data: UpdateUserMessageModel = {
			accountId: id,
			updateModel: body
		}
		return this.userService.updateUser(data);
	}

	@Delete(':id')
	public delete(@Param('id') id: string): Observable<{ message: string }> {
		return this.userService.delete(id);
	}
}
