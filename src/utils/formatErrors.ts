import { RespError } from "../types";

export default (errors: RespError[]) => errors.map(({ message }, idx) => {
	let variable = message.split(" ")[1].slice(2, -1);
	if (variable === "type") variable = "part of speech";
	variable = variable[0].toUpperCase() + variable.slice(1);
	return variable + " cannot be blank.";
});