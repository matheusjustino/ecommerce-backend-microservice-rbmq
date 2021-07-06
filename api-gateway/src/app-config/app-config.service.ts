import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
	constructor(private readonly configService: ConfigService) {}

	public get amqpUrl(): string {
		return this.configService.get<string>('AMQP_URL');
	}

	public get authQueue(): string {
		return this.configService.get<string>('AUTH_QUEUE');
	}
}
