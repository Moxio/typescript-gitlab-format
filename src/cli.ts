#!/usr/bin/env node

import { Command } from "commander";
import { text } from "node:stream/consumers";
import format from "./format";
import filter from "./filter";

const program = new Command();

program
	.option("-e --exclude <paths>", "paths to exclude, default js regex");


program.parse(process.argv);
const options = program.opts();

text(process.stdin).then((stdIn) => {
	let output = format(stdIn);

	if (options.exclude) {
		output = filter(output, new RegExp(options.exclude));
	}

	if (output.length > 0) {
		process.exitCode = 1;
	}

	process.stdout.write(JSON.stringify(output));
});
