import { join } from 'path';

const environments = ['develop', 'production'];
const config = environments.includes(process.env.NODE_ENV)
	? `${process.env.NODE_ENV}.env`
	: 'develop.env';

const configPath = join(process.cwd(), '/src/environments', config);

export const configOptions = {
	isGlobal: true,
	envFilePath: configPath,
};
