import { Issue } from "codeclimate-types";

export default function filter (input: Issue[], excludePattern: RegExp): Issue[] {
	return input.filter((issue) => {
		return excludePattern.test(issue.location.path) === false;
	});
}
