#!/usr/bin/env node

import { Command } from "commander";
import getStdin from "get-stdin";
import format from "./format";
import filter from "./filter";

const program = new Command();

program
	.option("-e --exclude <paths>", "paths to exclude, default js regex");


program.parse(process.argv);
const options = program.opts();

getStdin().then((stdIn) => {
	let output = format(stdIn);

	if (options.exclude) {
		output = filter(output, new RegExp(options.exclude));
	}

	console.log(output);
});
