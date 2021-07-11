import { Injectable, Logger } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as fs from 'fs';
import handlebars from 'handlebars';

import { ParserMailTemplate } from '../shared/mail/models/mail.model';

@Injectable()
export class HandlebarsMailTemplate {
	private logger = new Logger(HandlebarsMailTemplate.name);

	public parser({ file, variables }: ParserMailTemplate): Observable<string> {
		return from(
			fs.promises.readFile(file, {
				encoding: 'utf-8',
			}),
		).pipe(
			map((templateFileContent) => {
				const parseTemplate = handlebars.compile(templateFileContent);
				return parseTemplate(variables);
			}),
			tap(() => this.logger.log(`Parsed Successfully`)),
		);
	}
}
