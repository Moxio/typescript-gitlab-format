import filter from "../src/filter";

describe("filter", () => {
	it("filters output", () => {
		const output = filter([
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
		], new RegExp("node_modules\\/"));
		expect(output).toEqual([
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
