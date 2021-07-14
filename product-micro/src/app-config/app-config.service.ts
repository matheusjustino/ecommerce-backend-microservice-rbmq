import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
	constructor(private readonly configService: ConfigService) {}

	public get databaseUrl(): string {
		return this.configService.get<string>('DATABASE_URL');
	}

	public get amqpUrl(): string {
		return this.configService.get<string>('AMQP_URL');
	}

	public get queue(): string {
		return this.configService.get<string>('QUEUE');
	}
}
