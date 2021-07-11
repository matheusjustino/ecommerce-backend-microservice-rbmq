import { Provider } from "@nestjs/common";

// SERVICES
import { AuthService } from "./auth.service";
import { JobsService } from "@src/jobs/jobs.service";
import { UserService } from "@src/user/user.service";

// INTERFACES
import { AUTH_SERVICE } from "@src/shared/auth/interfaces/auth.service";
import { JOBS_SERVICE } from "@src/shared/jobs/interfaces/jobs.service";
import { USER_SERVICE } from "@src/shared/user/interfaces/user.service";

export const AuthProviders: Provider[] = [
	{
		useClass: AuthService,
		provide: AUTH_SERVICE,
	},
	{
		useClass: JobsService,
		provide: JOBS_SERVICE
	},
	{
		useClass: UserService,
		provide: USER_SERVICE
	}
];
