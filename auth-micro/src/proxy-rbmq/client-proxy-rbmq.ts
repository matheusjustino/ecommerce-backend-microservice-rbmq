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
	private clientProxyJobsMicro: ClientProxy = null;

	constructor(private readonly appConfigService: AppConfigService) {}

	public get clientMicroJobs(): ClientProxy {
		if (!this.clientProxyJobsMicro) {
			const clientProxy = this.createClientProxy(
				[this.appConfigService.amqpUrl],
				this.appConfigService.jobsQueue,
			);

			this.clientProxyJobsMicro = ClientProxyFactory.create(clientProxy);
		}

		return this.clientProxyJobsMicro;
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
