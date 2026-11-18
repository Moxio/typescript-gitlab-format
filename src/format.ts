import { parse, GrammarItem } from '@aivenio/tsc-output-parser';
import { Issue } from 'codeclimate-types';
import { createHash } from "node:crypto";

export default function format (input: string): Issue[] {
	input = input.replace(/\r/g, "");
	const grammarItems: GrammarItem[] = parse(input);

	const issues: Issue[] = [];
	const occurrenceCounts = new Map<string, number>();
	for (const inputItem of grammarItems) {
		const path = inputItem.value.path.value;
		const errorCode = inputItem.value.tsError.value.errorString;
		const message = inputItem.value.message.value;

		// Line and column are deliberately left out of the fingerprint, so that issues keep their identity
		// when code above them moves. Identical issues in one file are told apart by their occurrence index.
		const identity = JSON.stringify([ path, errorCode, message.trim() ]);
		const occurrence = occurrenceCounts.get(identity) ?? 0;
		occurrenceCounts.set(identity, occurrence + 1);

		issues.push({
			type: 'issue',
			categories: [ "Compatibility" ],
			check_name: errorCode,
			description: message,
			severity: 'major',
			fingerprint: createHash("sha256").update(identity + ":" + occurrence).digest("hex"),
			location: {
				path: path,
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
		});
	}
	return issues;
}
