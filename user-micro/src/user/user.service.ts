import { catchError, map, switchMap } from 'rxjs/operators';
import { RpcException } from '@nestjs/microservices';
import { Injectable, Logger } from '@nestjs/common';
import { from, Observable } from 'rxjs';

// MODELS
import {
	RegisterModel,
	RegisterResponseModel,
} from '../shared/user/models/user.model';
import { UserModel } from '../shared/user/models/user.model';
import { FindUserQueryModel } from '../shared/user/models/find-user-query.model';
import { UpdateUserMessageModel } from '../shared/user/models/update-user-message.model';

// REPOSITORIES
import { UserRepository } from '../database/repositories/user.repository';

// RBMQ
import { ClientProxyRbmq } from '../proxy-rbmq/client-proxy-rbmq';

// INTERFACES
import { IUserService } from '../shared/user/interfaces/user.service';

@Injectable()
export class UserService implements IUserService {
	private logger = new Logger(UserService.name);

	constructor(
		private readonly userRepository: UserRepository,
		private readonly clientProxyRbmq: ClientProxyRbmq,
	) { }

	public createUser(register: RegisterModel): Observable<UserModel> {
		this.logger.log(`Create User - Payload: ${JSON.stringify(register)}`);

		return from(this.userRepository.userModel.create(register)).pipe(
			map((user) => {
				const userJson = user.toJSON();
				delete userJson.password;
				const userResponse = Object.assign(
					new RegisterResponseModel(),
					userJson,
				);

				return userResponse;
			}),
		);
	}

	public findAll(query: FindUserQueryModel): Observable<UserModel[]> {
		this.logger.log(`Find all Users`);

		return from(this.userRepository.userModel.find(query)).pipe(
			map((res) => res as UserModel[]),
		);
	}

	public findById(
		accountId: string,
		selectPassword: boolean,
	): Observable<UserModel> {
		this.logger.log(`Find by id - Payload: ${accountId}`);

		const query = selectPassword ? '+password' : null;
		return from(
			this.userRepository.userModel.findOne({ accountId }).select(query),
		);
	}

	public update(data: UpdateUserMessageModel): Observable<UserModel> {
		const { accountId, updateModel } = data;

		this.logger.log(
			`Update User - Payload: ${JSON.stringify({ accountId, updateModel })}`,
		);

		return from(this.userRepository.userModel.findOne({ accountId })).pipe(
			switchMap((user: UserModel) => {
				if (!user) {
					throw new RpcException('User not found');
				}

				return from(
					this.userRepository.userModel.findOneAndUpdate(
						{
							accountId,
						},
						{
							$set: updateModel,
						},
						{
							new: true,
						},
					),
				);
			}),
			switchMap((user) => {
				return from(
					this.clientProxyRbmq.clientMicroAuth.send(
						'update-account',
						{
							accountId,
							updateModel,
						},
					),
				).pipe(map(() => user));
			}),
			catchError((error) => {
				this.logger.error(`Create Account Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}

	public delete(accountId: string): Observable<{ message: string }> {
		this.logger.log(`Delete User - Payload: ${accountId}`);

		return from(
			this.userRepository.userModel.findOneAndDelete({ accountId }),
		).pipe(
			switchMap((user) => {
				if (!user) {
					throw new RpcException('User not found');
				}

				return from(
					this.clientProxyRbmq.clientMicroAuth.emit(
						'delete-account',
						accountId,
					),
				).pipe(map(() => ({ message: 'Usuário deletado ' })));
			}),
			catchError((error) => {
				this.logger.error(
					`Delete User Error: ${JSON.stringify(error)}`,
				);

				throw new RpcException(error);
			}),
		);
	}
}
