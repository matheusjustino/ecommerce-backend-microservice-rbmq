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
	private clientProxyProductMicro: ClientProxy = null;

	constructor(private readonly appConfigService: AppConfigService) {}

	public get clientMicroProduct(): ClientProxy {
		if (!this.clientProxyProductMicro) {
			const clientProxy = this.createClientProxy(
				[this.appConfigService.amqpUrl],
				this.appConfigService.queue,
			);

			this.clientProxyProductMicro =
				ClientProxyFactory.create(clientProxy);
		}

		return this.clientProxyProductMicro;
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
