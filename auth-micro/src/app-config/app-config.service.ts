import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
	constructor(private readonly configService: ConfigService) {}

	public get databaseUrl(): string {
		return this.configService.get<string>('DATABASE_URL');
	}

	public get secret(): string {
		return this.configService.get<string>('SECRET');
	}

	public get amqpUrl(): string {
		return this.configService.get<string>('AMQP_URL');
	}

	public get queue(): string {
		return this.configService.get<string>('QUEUE');
	}

	public get jobsQueue(): string {
		return this.configService.get<string>('JOBS_QUEUE');
	}

	public get usersQueue(): string {
		return this.configService.get<string>('USERS_QUEUE');
	}
}
