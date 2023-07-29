
// Terminal Variables

let terminal = {};

let termConfig = {};
let termCommands = [];

const space = (int) => {
	return "&nbsp;".repeat(int)
}

console.write = (text, type) => {
	const termContent = termConfig.terminalElement.querySelector(termConfig.terminalContent);
	termContent.innerHTML += `<div class="type-${type}">${text}</div>`
}

// Terminal Logs

function cLog(text) {
	console.write(text, "log")
}
function cInfo(text) {
	console.write(text, "info")
}
function cWarn(text) {
	console.write(text, "warn")
}
function cError(text) {
	console.write(text, "error")
}
function cDebug(text) {
	console.write(text, "debug")
}

// Terminal Commands

terminal.createCommand = (object) => {
	for (const i in object) {
		let obj = {
			"command": object[i].command,
			"function": object[i].function,
		}
		termCommands.push(obj);
	}
}

function commandCheck(command) {
	const cmd = command.split(" ")[0];
	let ret = `Command not found`;
	termCommands.map((v) => {
		if(v.command === cmd) {
			ret = v.function(command.split(" ").join(" "));
		}
	})
	return ret;
}

// Terminal Arguments

terminal.getArgs = (arg) => {
	console.log(arg.split(" "));
	let args = arg.split(" ");
	args.shift();
	return args
}

terminal.checkArg = (args, loc) => {
	const check = args[loc];

	if(!check) {
		return false;
	} else {
		return true;
	}
}

// Terminal Initialisation

terminal.initialise = (object) => {

	let initMsg = object.initMessage,
		terminal = object.terminalContainer

	let terminalContainer = document.querySelector(terminal);
	
	console.log(object);

	termConfig = {
		"initMessage": initMsg,
		"terminalContainer": terminal,
		"terminalElement": terminalContainer,
		"terminalInput": object.terminalInput,
		"terminalContent": object.terminalContent,
	};

	cLog(initMsg)

	// Add functions to input

	console.log(termConfig.terminalInput, document.querySelector(termConfig.terminalInput));

	document.querySelector(termConfig.terminalInput).addEventListener("keydown", (e) => {
		console.log("keypress");
		if(e.keyCode === 13) {
			let input = document.querySelector(object.terminalInput).value;
			if(input === "" || input === " ") return
			document.querySelector(object.terminalInput).value = ""
			console.write(`<span class="type-info"> > <span class="type-log">${input}</span></span>`, "input")
			console.write(commandCheck(input), "debug")
		}
	})

}