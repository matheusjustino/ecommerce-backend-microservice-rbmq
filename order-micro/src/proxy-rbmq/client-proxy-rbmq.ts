import { Injectable } from '@nestjs/common';
import {
	ClientOptions,
	ClientProxy,
	ClientProxyFactory,
	Transport,
} from '@nestjs/microservices';

// SERVICES
import { AppConfigService } from '../app-config/app-config.service';

@Injectable()
export class ClientProxyRbmq {
	private clitProxyUsersMicro: ClientProxy = null;

	constructor(private readonly appConfigService: AppConfigService) {}

	public get clientMicroUsers(): ClientProxy {
		if (!this.clitProxyUsersMicro) {
			const clientProxy = this.createClientProxy(
				[this.appConfigService.amqpUrl],
				this.appConfigService.usersQueue,
			);

			this.clitProxyUsersMicro = ClientProxyFactory.create(clientProxy);
		}

		return this.clitProxyUsersMicro;
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
