import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { isValidCPF } from '@brazilian-utils/brazilian-utils';
import * as bcrypt from 'bcrypt';

// INTERFACES
import { IAuthService } from '@src/shared/auth/interfaces/auth.service';

// REPOSITORIES
import { UserRepository } from '@src/database/repositories/user.repository';

// MODELS
import { UserModel } from '@src/shared/auth/models/user.model';
import { RegisterModel } from '@src/shared/auth/models/register.model';
import { LoginModel } from '@src/shared/auth/models/login.model';

@Injectable()
export class AuthService implements IAuthService {
	private logger = new Logger(AuthService.name);

	constructor(
		private readonly jwtService: JwtService,
		private readonly userRepository: UserRepository,
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
					map((user) => {
						return user;
					}),
				);
			}),
			catchError((error) => {
				this.logger.error(`Create Account Error: ${error}`);

				throw new RpcException(error);
			}),
		);

		// return from(this.userRepository.userModel.create(register)).pipe(
		// 	switchMap((user) => {
		// 		const mailData: MailContact = {
		// 			name: `${user.firstName} ${user.lastName}`,
		// 			email: user.email,
		// 		};

		// 		return this.jobsService
		// 			.sendWelcomeEmail(mailData)
		// 			.pipe(map(() => user));
		// 	}),
		// 	catchError((error) => {
		// 		this.logger.error(`Create Account Error: ${error}`);

		// 		throw new RpcException(error);
		// 	}),
		// );
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
}
