import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const MongoPipeTransform = createParamDecorator(
	(value: string, ctx: ExecutionContext) => {
		const args = ctx.getArgs();
		if (args && args[0]) {
			const data = args[0];

			const query = Object.entries(data).reduce((acc, obj) => {
				const key = obj[0];
				const val =
					typeof obj[1] === 'string'
						? new RegExp(`^${obj[1]}`, 'i')
						: obj[1];
				return {
					...acc,
					[key]: val,
				};
			}, {});

			return query;
		}

		return value;
	},
);
