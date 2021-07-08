import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
	constructor(private readonly configService: ConfigService) {}

	public get amqpUrl(): string {
		return this.configService.get<string>('AMQP_URL');
	}

	public get queue(): string {
		return this.configService.get<string>('QUEUE');
	}

	public get mailCompanyName(): string {
		return this.configService.get<string>('MAIL_COMPANY_NAME');
	}

	public get mailCompanyEmail(): string {
		return this.configService.get<string>('MAIL_COMPANY_EMAIL');
	}

	public get mailHost(): string {
		return this.configService.get<string>('MAIL_HOST');
	}

	public get mailPort(): number {
		return this.configService.get<number>('MAIL_PORT');
	}

	public get mailUser(): string {
		return this.configService.get<string>('MAIL_AUTH_USER');
	}

	public get mailPass(): string {
		return this.configService.get<string>('MAIL_AUTH_PASS');
	}

	public get bullRedisHost(): string {
		return this.configService.get<string>('BULL_REDIS_HOST');
	}

	public get bullRedisPort(): number {
		return this.configService.get<number>('BULL_REDIS_PORT');
	}
}
