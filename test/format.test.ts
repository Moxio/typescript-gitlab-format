import format from "../src/format";

describe("format", () => {
	it("formats tsc output to json", () => {
		const output = format("node_modules/example/example.d.ts(296,22): error TS7006: Parameter 'node' implicitly has an 'any' type.\nexample/example.d.ts(296,22): error TS7006: Parameter 'node' implicitly has an 'any' type.\n");
		expect(output).toEqual([
			{
				"categories": [
					"Compatibility"
				],
				"check_name": "TS7006",
				"description": " Parameter 'node' implicitly has an 'any' type.\n",
				"fingerprint": "e62397a9dc88ce9f76114d33f7aa0801253acdabf3037b60bd8b2051b4464ee4",
				"location": {
					"path": "node_modules/example/example.d.ts",
					"positions": {
						"begin": {
							"column": 22,
							"line": 296
						},
						"end": {
							"column": 22,
							"line": 296
						}
					}
				},
				"severity": "major",
				"type": "issue"
			},
			{
				"categories": [
					"Compatibility"
				],
				"check_name": "TS7006",
				"description": " Parameter 'node' implicitly has an 'any' type.\n",
				"fingerprint": "93fe2e339dfb02e9bdd3832dd9902e4d4371509b3c669f58b261f38179fc7dd3",
				"location": {
					"path": "example/example.d.ts",
					"positions": {
						"begin": {
							"column": 22,
							"line": 296
						},
						"end": {
							"column": 22,
							"line": 296
						}
					}
				},
				"severity": "major",
				"type": "issue"
			}
		]);
	});

	it("gives identical issues in the same file distinct fingerprints", () => {
		const output = format("example.ts(1,1): error TS7006: Parameter 'node' implicitly has an 'any' type.\nexample.ts(5,1): error TS7006: Parameter 'node' implicitly has an 'any' type.\nexample.ts(9,1): error TS7006: Parameter 'other' implicitly has an 'any' type.\n");
		const fingerprints = new Set(output.map((issue) => issue.fingerprint));
		expect(fingerprints.size).toBe(3);
	});

	it("keeps fingerprints stable when issues move to another line or column", () => {
		const before = format("example.ts(1,1): error TS7006: Parameter 'node' implicitly has an 'any' type.\nexample.ts(5,1): error TS7006: Parameter 'node' implicitly has an 'any' type.\n");
		const after = format("example.ts(3,7): error TS7006: Parameter 'node' implicitly has an 'any' type.\nexample.ts(8,2): error TS7006: Parameter 'node' implicitly has an 'any' type.\n");
		expect(after.map((issue) => issue.fingerprint)).toEqual(before.map((issue) => issue.fingerprint));
	});
});
