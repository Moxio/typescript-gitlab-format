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
	})
});
