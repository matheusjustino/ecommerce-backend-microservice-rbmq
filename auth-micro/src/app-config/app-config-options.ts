import { join } from 'path';

const environments = ['develop', 'production', 'docker'];
const config = environments.includes(process.env.NODE_ENV)
	? `${process.env.NODE_ENV}.env`
	: 'develop.env';

const configPath = join(process.cwd(), '/src/environments', config);

console.log(configPath, process.env.NODE_ENV);

export const configOptions = {
	isGlobal: true,
	envFilePath: configPath,
};
