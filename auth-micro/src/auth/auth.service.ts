import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { isValidCPF } from '@brazilian-utils/brazilian-utils';
import * as bcrypt from 'bcrypt';
import { isAfter, addHours } from 'date-fns';

// INTERFACES
import { IAuthService } from '@src/shared/auth/interfaces/auth.service';

// REPOSITORIES
import { UserRepository } from '@src/database/repositories/user.repository';
import { UserTokenRepository } from '@src/database/repositories/user-token.repository';

// MODELS
import { UserModel } from '@src/shared/auth/models/user.model';
import { RegisterModel } from '@src/shared/auth/models/register.model';
import { LoginModel } from '@src/shared/auth/models/login.model';
import {
	ForgotPasswordModel,
	MailContact,
	ResetPasswordModel,
} from '@src/shared/jobs/mail/mailModel';
import { UserTokenModel } from '@src/shared/auth/models/user-token.model';

// SERVICES
import { JobsService } from '@src/jobs/jobs.service';
import { UserTokenDocument } from '@src/database/schemas/user-token.schema';

@Injectable()
export class AuthService implements IAuthService {
	private logger = new Logger(AuthService.name);

	constructor(
		private readonly jwtService: JwtService,
		private readonly jobsService: JobsService,
		private readonly userRepository: UserRepository,
		private readonly userTokenRepository: UserTokenRepository,
	) {}

	public validateToken(token: string): Observable<UserModel> {
		this.logger.log(`Validate Token - Payload: ${token}`);

		return from(this.jwtService.verifyAsync(token)).pipe(
			switchMap((payload) => {
				return from(
					this.userRepository.userModel.findOne({
						email: payload['email'],
					}),
				);
			}),
			map((user) => {
				if (!user) {
					throw new RpcException('Invalid token. User not found');
				}

				return user as UserModel;
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
					return throwError('Passwords does not match');
				}

				if (!isValidCPF($register.legalDocument)) {
					return throwError('Invalid legal document');
				}

				return from(
					this.userRepository.userModel.create(register),
				).pipe(
					switchMap((user) => {
						const mailData: MailContact = {
							name: `${user.firstName} ${user.lastName}`,
							email: user.email,
						};

						return this.jobsService
							.sendWelcomeEmail(mailData)
							.pipe(map(() => user));
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
			this.userRepository.userModel.findOne({ email: login.email }),
		).pipe(
			switchMap((user) => {
				if (!user) {
					throw new RpcException('User not found');
				}

				return from(bcrypt.compare(login.password, user.password));
			}),
			switchMap((result) => {
				if (!result) {
					throw new RpcException('Invalid Password!');
				}

				const token = this.jwtService.sign({ email: login.email });

				return of({ token });
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
			this.userRepository.userModel.findOne({ email: userEmail }),
		).pipe(
			switchMap((user) => {
				if (!user) {
					throw new RpcException('User not found');
				}

				return from(
					this.userTokenRepository.userTokenModel.create({
						userId: user._id,
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
								name: `${user.firstName} ${user.lastName}`,
								email: user.email,
							},
							token: result.token,
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

	public resetPassword(data: ResetPasswordModel) {
		this.logger.log(`Reset Password - Payload: ${JSON.stringify(data)}`);

		return from(
			this.userTokenRepository.userTokenModel.findOne({
				token: data.token,
			}),
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
					this.userRepository.userModel.findById(userToken.userId),
				).pipe(
					switchMap((user) => {
						if (!user) {
							throw new RpcException('User not found');
						}

						user.password = data.password;

						return from(user.save()).pipe(
							switchMap((user) => {
								if (!user) {
									throw new RpcException('Something wrong');
								}

								userToken.used = true;
								return from(userToken.save()).pipe(
									map(() => user),
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
}
