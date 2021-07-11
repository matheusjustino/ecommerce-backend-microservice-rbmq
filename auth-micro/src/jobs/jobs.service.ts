import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

// RBMQ
import { ClientProxyRbmq } from '@src/proxy-rbmq/client-proxy-rbmq';

// MODELS
import { ForgotPasswordModel } from '@src/shared/jobs/mail/mailModel';

// INTERFACES
import { IJobsService } from '@src/shared/jobs/interfaces/jobs.service';

@Injectable()
export class JobsService implements IJobsService {
	private logger = new Logger(`API-GATEWAY: ${JobsService.name}`);
	private clientProxyJobsMicro: ClientProxy = null;

	constructor(private readonly clientProxyRbmq: ClientProxyRbmq) {
		this.clientProxyJobsMicro = this.clientProxyRbmq.clientMicroJobs;
	}

	public sendWelcomeEmail(data): Observable<void> {
		this.logger.log(
			`Send welcome email - Payload: ${JSON.stringify(data)}`,
		);

		return this.clientProxyJobsMicro.emit('send-welcome-email', data);
	}

	public sendForgotPasswordEmail(data: ForgotPasswordModel): Observable<void> {
		this.logger.log(
			`Send Forgot Password Email - Payload: ${JSON.stringify(data)}`,
		);

		return this.clientProxyJobsMicro.emit(
			'send-forgot-password-email',
			data,
		);
	}
}
