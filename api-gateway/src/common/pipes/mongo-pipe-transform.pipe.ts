import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class MongoPipeTransform implements PipeTransform {
	public transform(value: any) {
		if (value) {
			const query = Object.entries(value).reduce((acc, obj) => {
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
	}
}
