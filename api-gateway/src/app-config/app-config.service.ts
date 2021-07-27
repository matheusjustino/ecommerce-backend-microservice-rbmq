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

	public get usersQueue(): string {
		return this.configService.get<string>('USERS_QUEUE');
	}

	public get productQueue(): string {
		return this.configService.get<string>('PRODUCT_QUEUE');
	}

	public get orderQueue(): string {
		return this.configService.get<string>('ORDER_QUEUE');
	}
}
