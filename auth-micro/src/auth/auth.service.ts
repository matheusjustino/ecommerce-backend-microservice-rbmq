import { Inject, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { isValidCPF } from '@brazilian-utils/brazilian-utils';
import { isAfter, addHours } from 'date-fns';

// INTERFACES
import { IAuthService } from '@src/shared/auth/interfaces/auth.service';
import {
	IHashService,
	HASH_SERVICE,
} from '@src/shared/hash/interfaces/hash.service';
import {
	IJobsService,
	JOBS_SERVICE,
} from '@src/shared/jobs/interfaces/jobs.service';
import {
	IUserService,
	USER_SERVICE,
} from '@src/shared/user/interfaces/user.service';

// REPOSITORIES
import { AccountRepository } from '@src/database/repositories/account.repository';
import { UserTokenRepository } from '@src/database/repositories/user-token.repository';

// MODELS
import { AccountModel } from '@src/shared/auth/models/account.model';
import { RegisterModel } from '@src/shared/auth/models/register.model';
import { LoginModel } from '@src/shared/auth/models/login.model';
import { UserTokenModel } from '@src/shared/auth/models/user-token.model';
import { UpdateUserMessageModel } from '@src/shared/auth/models/update-account-message.model';
import { UpdatePasswordModel } from '@src/shared/auth/models/update-password.model';
import {
	UserModel,
	UserRegisterModel,
} from '@src/shared/auth/models/user.model';
import {
	ForgotPasswordModel,
	MailContact,
	ResetPasswordModel,
} from '@src/shared/jobs/mail/mailModel';

// SCHEMAS
import { UserTokenDocument } from '@src/database/schemas/user-token.schema';
import { UpdateEmailModel } from '@src/shared/user/models/update-email.model';
import { UpdateEmailMessageModel } from '@src/shared/user/models/update-email-message.model';

@Injectable()
export class AuthService implements IAuthService {
	private logger = new Logger(AuthService.name);

	constructor(
		@Inject(HASH_SERVICE)
		private readonly hashService: IHashService,
		@Inject(JOBS_SERVICE)
		private readonly jobsService: IJobsService,
		@Inject(USER_SERVICE)
		private readonly userService: IUserService,
		private readonly jwtService: JwtService,
		private readonly accountRepository: AccountRepository,
		private readonly userTokenRepository: UserTokenRepository,
	) {}

	public validateToken(token: string): Observable<AccountModel> {
		this.logger.log(`Validate Token - Payload: ${token}`);

		return from(this.jwtService.verifyAsync(token)).pipe(
			switchMap((payload) => {
				return from(
					this.accountRepository.accountModel.findById(
						payload['accountId'],
					),
				);
			}),
			map((account: AccountModel) => {
				if (!account) {
					throw new RpcException('Invalid token. Account not found');
				}

				return account;
			}),
			catchError((error) => {
				this.logger.error(`Validate Token Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}

	public register(register: RegisterModel): Observable<UserModel> {
		this.logger.log(
			`Create Account - Payload: ${JSON.stringify(register)}`,
		);

		return of(register).pipe(
			switchMap(($register) => {
				if ($register.password !== $register.confirmPassword) {
					throw new RpcException('Passwords does not match');
				}

				if (!isValidCPF($register.legalDocument)) {
					throw new RpcException('Invalid legal document');
				}

				return from(
					this.accountRepository.accountModel.create(register),
				).pipe(
					switchMap((account: AccountModel) => {
						const createUser: UserRegisterModel = {
							accountId: account._id,
							...register,
						};

						return this.userService.createUser(createUser).pipe(
							switchMap((res) => {
								const mailData: MailContact = {
									name: `${register.firstName} ${register.lastName}`,
									email: register.email,
								};

								// return of(res);

								return this.jobsService
									.sendWelcomeEmail(mailData)
									.pipe(map(() => res));
							}),
						);
					}),
				);
			}),
			catchError((error) => {
				this.logger.error(`Create Account Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}

	public doLogin(login: LoginModel): Observable<{ token: string }> {
		this.logger.log(`Login - Payload: ${JSON.stringify(login)}`);

		if (login.password !== login.confirmPassword) {
			throw new RpcException('Passwords does not match');
		}

		return from(
			this.accountRepository.accountModel
				.findOne({ email: login.email })
				.select('+password'),
		).pipe(
			switchMap((account) => {
				if (!account) {
					throw new RpcException('User not found');
				}

				return from(
					this.hashService
						.compareHash(login.password, account.password)
						.pipe(
							switchMap((result) => {
								if (!result) {
									throw new RpcException('Invalid Password!');
								}

								const token = this.jwtService.sign({
									accountId: account._id,
									email: login.email,
								});

								return of({ token });
							}),
						),
				);
			}),

			catchError((error) => {
				this.logger.error(`Login Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}

	public sendForgotPasswordEmail(
		userEmail: string,
	): Observable<{ message: string }> {
		this.logger.log(
			`Generate Token - Payload: ${JSON.stringify(userEmail)}`,
		);

		return from(
			this.accountRepository.accountModel.findOne({ email: userEmail }),
		).pipe(
			switchMap((account: AccountModel) => {
				if (!account) {
					throw new RpcException('Account not found');
				}

				return from(
					this.userTokenRepository.userTokenModel.create({
						userId: account._id,
					}),
				).pipe(
					switchMap((result) => {
						if (!result) {
							throw new RpcException(
								'Error trying generate user token',
							);
						}

						const payload: ForgotPasswordModel = {
							to: {
								name: `${'user.firstName'} ${'user.lastName'}`,
								email: account.email,
							},
							token: result._id,
						};

						return this.jobsService.sendForgotPasswordEmail(
							payload,
						);
					}),
				);
			}),
			map(() => ({ message: 'Email de recuperação de senha enviado' })),
			catchError((error) => {
				this.logger.error(`Generate Token Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}

	public resetPassword(
		data: ResetPasswordModel,
	): Observable<{ message: string }> {
		this.logger.log(`Reset Password - Payload: ${JSON.stringify(data)}`);

		return from(
			this.userTokenRepository.userTokenModel.findById(data.token),
		).pipe(
			switchMap((userToken: UserTokenDocument) => {
				if (!userToken) {
					throw new RpcException('User Token not found');
				}

				if (userToken.used) {
					throw new RpcException('Token expired');
				}

				const tokenCreatedAt = (userToken as UserTokenModel).createdAt;
				const compareDate = addHours(new Date(tokenCreatedAt), 2);

				if (isAfter(Date.now(), compareDate)) {
					throw new RpcException('Token expired');
				}

				return from(
					this.accountRepository.accountModel
						.findById(userToken.userId)
						.select('+password'),
				).pipe(
					switchMap((account) => {
						if (!account) {
							throw new RpcException('User not found');
						}

						account.password = data.password;

						return from(account.save()).pipe(
							switchMap((user) => {
								if (!user) {
									throw new RpcException('Something wrong');
								}

								userToken.used = true;
								return from(userToken.save()).pipe(
									map(() => ({
										message: 'Sua senha foi alterada',
									})),
								);
							}),
						);
					}),
				);
			}),
			catchError((error) => {
				this.logger.error(`Reset Password Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}

	public updateAccount(
		data: UpdateUserMessageModel,
	): Observable<AccountModel> {
		const { accountId, updateModel } = data;

		this.logger.log(
			`Update Account - Payload: ${JSON.stringify({
				accountId,
				updateModel,
			})}`,
		);

		return from(
			this.accountRepository.accountModel.findById(accountId),
		).pipe(
			switchMap((account) => {
				const updatedAccount = Object.assign(account, updateModel);

				return from(updatedAccount.save());
			}),
			catchError((error) => {
				this.logger.error(`Update Account Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}

	public deleteAccount(accountId: string): Observable<{ message: string }> {
		return from(
			this.accountRepository.accountModel.findOneAndDelete({
				_id: accountId,
			}),
		).pipe(
			map((account) => {
				if (!account) {
					throw new RpcException('User not found');
				}

				return { message: 'Conta deletada' };
			}),
			catchError((error) => {
				this.logger.error(
					`Delete Account Error: ${JSON.stringify(error)}`,
				);

				throw new RpcException(error);
			}),
		);
	}

	public updatePassword(
		accountEmail: string,
		updateModel: UpdatePasswordModel,
	): Observable<{ message: string }> {
		this.logger.log(
			`Update Password - Payload: ${JSON.stringify(accountEmail)}`,
		);
		const { yourPassword, newPassword, confirmNewPassword } = updateModel;

		if (newPassword !== confirmNewPassword) {
			throw new RpcException('Passwords does not match');
		}

		return from(
			this.accountRepository.accountModel
				.findOne({
					email: accountEmail,
				})
				.select('+password'),
		).pipe(
			switchMap((account) => {
				if (!account) {
					throw new RpcException('Account not found');
				}

				return this.hashService
					.compareHash(yourPassword, account.password)
					.pipe(
						switchMap((result) => {
							if (!result) {
								throw new RpcException('Invalid password');
							}

							account.password = newPassword;

							return from(account.save());
						}),
					);
			}),
			map(() => ({ message: 'Password updated' })),
		);
	}

	public updateEmail(
		data: UpdateEmailMessageModel,
	): Observable<{ message: string }> {
		const { accountId, updateModel } = data;
		return from(
			this.accountRepository.accountModel.findById(accountId),
		).pipe(
			switchMap((account) => {
				if (!account || account.email !== updateModel.oldEmail) {
					throw new RpcException('Account not found');
				}

				account.email = updateModel.newEmail;
				return from(account.save());
			}),
			map(() => {
				this.userService.updateEmail(updateModel.newEmail);
				return { message: 'Email updated' };
			}),
		);
	}

	public accountRole(accountId: string): Observable<string> {
		return from(
			this.accountRepository.accountModel.findById(accountId),
		).pipe(
			map((account) => {
				if (!account) {
					if (!account) {
						throw new RpcException('Account not found');
					}
				}

				return account.role;
			}),
		);
	}
}
