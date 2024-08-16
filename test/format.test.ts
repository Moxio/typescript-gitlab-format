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
				"fingerprint": "20066f3363e75e58f37a5d94dc4b2e833e31166d7be38fa3e3e13788ff644747",
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
				"fingerprint": "e76aa9fe395c5050ed3cc53bb4ee5d12c3d15afadb361a436a8db8bd1f42670e",
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
