import { parse, GrammarItem } from '@aivenio/tsc-output-parser';
import { Issue } from 'codeclimate-types';
import { createHash } from "node:crypto";

export default function format (input: string): Issue[] {
	const foo: GrammarItem[] = parse(input);

	return foo.map((inputItem) => {
		return {
			type: 'issue',
			categories: [ "Compatibility" ],
			check_name: inputItem.value.tsError.value.errorString,
			description: inputItem.value.message.value,
			severity: 'major',
			fingerprint: createHash("sha256").update(inputItem.value.path.value + ":" +inputItem.value.tsError.value.errorString).digest("hex"),
			location: {
				path: inputItem.value.path.value,
				positions: {
					begin: {
						line: inputItem.value.cursor.value.line,
						column: inputItem.value.cursor.value.col
					},
					end: {
						line: inputItem.value.cursor.value.line,
						column: inputItem.value.cursor.value.col
					},
				}
			}
		}
	});
}
