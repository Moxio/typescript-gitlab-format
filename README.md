[![Continuous Integration](https://github.com/Moxio/typescript-gitlab-format/actions/workflows/ci.yml/badge.svg)](https://github.com/Moxio/typescript-gitlab-format/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/typescript-gitlab-format.svg)](https://www.npmjs.com/package/typescript-gitlab-format)

typescript-gitlab-format
===================
Library for converting output of tsc --noEmit command to the gitlab ci codeclimate format, and filter unwanted entries.

Installation
------------
This library can be installed from the NPM package registry.
Depending on your use case it might be better to install this package globally
(if you want to run these commands from your continuous integration server for example)

Using NPM:
```
npm install typescript-gitlab-format
```
or Yarn
```
yarn add typescript-gitlab-format
```

Usage
-----
From the command line you can run this command
```
(./node_modules/.bin/tsc --project ./tsconfig.json --noEmit || true) | ./node_modules/.bin/typescript-gitlab-format -e [exclude regex] > build-logs/typescript-error.json
```
There is one optional command line argument:

| short arg | long arg | effect  |
|---|---|---|
| -e | --exclude | the javascript regex to determine which entries get excluded |

Provided filters
--------------

### -e --exclude
Passing along the -e or --exclude flag will exclude entries within the typescript output based on filepaths that match the given regular expression.
A check is performed using standard javascript regexp: `RegExp(..passes argument..).test(..tsc filepath..)`.
If this function returns true the file is skipped.

#### example
Given tsc output that produces errors in these files:
- `node_modules/example/example.d.ts`
- `example/example.d.ts`

Running this command:
`(./node_modules/.bin/tsc --project ./tsconfig.json --noEmit || true) | ./node_modules/.bin/typescript-gitlab-format -e "node_modules\\/" > build-logs/typescript-error.json`

Will result in a file with these rules:
```json
[
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
]
```

Versioning
----------
This project adheres to [Semantic Versioning](http://semver.org/).

Contributing
------------
Contributions to this project are more than welcome.

License
-------
This project is released under the MIT license.

Treeware
--------
This package is [Treeware](https://treeware.earth/). If you use it in production,
then we'd appreciate it if you [**buy the world a tree**](https://plant.treeware.earth/Moxio/typescript-gitlab-format)
to thank us for our work. By contributing to the Treeware forest you'll be creating
employment for local families and restoring wildlife habitats.

---
Made with love, coffee and fun by the [Moxio](https://www.moxio.com) team from
Delft, The Netherlands. Interested in joining our awesome team? Check out our
[vacancies](https://werkenbij.moxio.com/) (in Dutch).
