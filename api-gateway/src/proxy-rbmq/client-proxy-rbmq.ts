import { Injectable } from '@nestjs/common';
import {
	ClientOptions,
	ClientProxy,
	ClientProxyFactory,
	Transport,
} from '@nestjs/microservices';

// SERVICES
import { AppConfigService } from '@src/app-config/app-config.service';

@Injectable()
export class ClientProxyRbmq {
	private clientProxyAuthMicro: ClientProxy = null;

	constructor(private readonly appConfigService: AppConfigService) {}

	public get clientAuthMicro(): ClientProxy {
		if (!this.clientProxyAuthMicro) {
			const clientProxy = this.createClientProxy(
				[this.appConfigService.amqpUrl],
				this.appConfigService.authQueue,
			);

			this.clientProxyAuthMicro = ClientProxyFactory.create(clientProxy);
		}

		return this.clientProxyAuthMicro;
	}

	private createClientProxy(
		urls: string[],
		queue: string,
	): {
		transport: Transport.RMQ;
	} & ClientOptions {
		return {
			transport: Transport.RMQ,
			options: {
				urls,
				queue,
				queueOptions: {
					durable: false,
				},
			},
		};
	}
}
