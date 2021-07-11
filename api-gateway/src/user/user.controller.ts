import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';

// MODELS
import { UserModel } from '@src/shared/user/models/user.model';
import { UpdateUserModel } from '@src/shared/user/models/update-user.model';
import { FindUserQueryModel } from '@src/shared/user/models/find-user-query.model';
import { UpdateUserMessageModel } from '@src/shared/user/models/update-user-message.model';

// INTERFACES
import {
	IUserService,
	USER_SERVICE,
} from '@src/shared/user/interfaces/user.service';

// GUARDS
import { JwtAuthGuard } from '@src/common/guards/jwt.guard';
import { RolesGuard } from '@src/common/guards/roles.guard';

// PIPES
import { UpdatePropertiesValidationPipe } from '@src/common/pipes/update-properties-validation.pipe';

// DECORATORS
import { hasRoles } from '@src/common/decorators/roles.decorator';

// ENUMS
import { UserRole } from '@src/common/enums/user-role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
	constructor(
		@Inject(USER_SERVICE)
		private readonly userService: IUserService,
	) {}

	@Get()
	@hasRoles(UserRole.ADMIN)
	public findAll(
		@Query() query: FindUserQueryModel,
	): Observable<UserModel[]> {
		return this.userService.findAll(query);
	}

	@Put(':id')
	@hasRoles(UserRole.ADMIN, UserRole.CUSTOMER)
	public update(
		@Param('id') id: string,
		@Body(UpdatePropertiesValidationPipe) body: UpdateUserModel,
	): Observable<UserModel> {
		const data: UpdateUserMessageModel = {
			accountId: id,
			updateModel: body,
		};

		return this.userService.updateUser(data);
	}

	@Delete(':id')
	@hasRoles(UserRole.ADMIN)
	public delete(@Param('id') id: string): Observable<{ message: string }> {
		return this.userService.delete(id);
	}
}
