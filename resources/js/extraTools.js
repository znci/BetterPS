
// FANCY-TIME

// (c) 2022 zNotChill - See LICENSE.md

/**
 * Returns the time between 2 points, in 24 hour time.
 * @param {integer} time - converts the time between time and start params
 * @param {integer} start - start time, epoch time. if not set, it sets to 0, so it just gets the time of time param.
 * @returns 
 */
const __convertTime = function(time, start = 0) {
	const current = time;
	const now = current - start;
	return new Date(now).toLocaleTimeString("it-US");
}

/**
 * Returns the converted time of now.
 * @param {integer} time - any epoch timestamp - defaults to now 
 * @returns 
 */
const __time = function(time = Date.now()) {
	return __convertTime(time)
}

/**
 * Returns the duration between two epoch timestamps.
 * @param {integer} start - the start epoch timestamp
 * @param {integer} now - any epoch timestamp, defaults to now
 * @returns 
 */
const __duration = function(start, now = Date.now()) {
	return __convertTime(now, start)
}

/**
 * Concatenates the formatted time with any string.
 * @param {integer} str - any string
 * @returns 
 */
const __timeStr = function(str) {
	return `[${__time()}] ${str}`
}

//


const config = {
	"console": {
		"key": "`"
	},
	"routes": {
		"plugins": "/dashboard/plugins",
	}
}

let REGISTERED_CONSOLE_COMMANDS = {};

/*

	Plugins

*/
$('link[rel=stylesheet][href~="/templates/Dashboard/assets/css/cp_dark.css"]').remove();
document.querySelectorAll(".text-dark").forEach((v) => {
	v.classList.replace("text-dark", "text-light")
})
function installPlugin(name){
	$.get("/dashboard/plugins/?install=" + name, function() {
		console.log(`Installed Plugin ${name}`);
	})
}

function uninstallPlugin(name){
	$.get("/dashboard/plugins/?remove=" + name, function() {
		console.log(`Uninstalled Plugin ${name}`);
	})
}

function getGoodPlugins() {
	const skAddons = ["Skript", "SkQuery", "MongoSK", "skNBeeT", "skDragon", "Ersatz", "TuSKe", "Multiverse-Core", "Multiverse-Inventories", "WorldEdit", "FastAsyncWorldEdit", "VoxelSniper", "VoidWorld", "ViaRewind", "ViaBackwards", "LuckPerms", "Vault", "WorldGuard"]
	const uninstalls = ["Essentials", "EssentialsAntiBuild", "EssentialsChat", "EssentialsProtect", "EssentialsSpawn", "GroupManager"]
	skAddons.forEach((v) => {
		installPlugin(v)
	})
	uninstalls.forEach((v) => {
		uninstallPlugin(v)
	})
}

/*
	Extra Navbar Info
*/
document.querySelector(".navbar-nav.ml-auto").insertAdjacentHTML("afterBegin", `
<li class="nav-item">
	<a class="nav-link" href="https://patreon.com/partydragen">
		<i class="fas fa-heart" style="color: #d9534f"></i> 
		Patreon
	</a>
</li>
`)
function makeNavItem(text, icon, href) {
	const navbar = document.querySelector(".navbar-nav");
	navbar.innerHTML += `
	<li class="nav-item">
		<a class="nav-link" href="${href}" target="_blank">
			<i class="nav-icon ${icon}"></i>
			<span>
				${text}
			</span>
		</a>
	</li>
	`
}
window.onload = () => {
	const navbar = document.querySelector(".navbar-nav");
	navbar.innerHTML += `
		<hr class="sidebar-divider d-none d-md-block">
		<a href="https://github.com/zNotChill/BetterPS" class="sidebar-brand d-flex align-items-center justify-content-center">
			<div class="sidebar-brand-text mx-3" style="margin-top: 4px">BetterPS</div>
		</a>
	`
	makeNavItem("My GitHub", "fab fa-github", "https://github.com/zNotChill")
	makeNavItem("Skript Dir", "nav-icon fas fa-folder", "https://playerservers.com/dashboard/filemanager/&dir=/plugins/Skript/scripts")
	makeNavItem("spigot.yml", "nav-icon fas fa-file", "https://playerservers.com/dashboard/filemanager/&action=edit&medit=/spigot.yml")

	// Initiate CONSOLE
	CONSOLE.init();
	CONSOLE_LOG += `${__timeStr("Initiated Console:nl:")}`
	
	CONSOLE.getPlugins("installed");
	CONSOLE_LOG += `${__timeStr("Initiated Plugin List:nl:")}`
	// 
}
/*
*/

// Console

let CONSOLE_OPENED = false;
let CONSOLE_LOG = "";
let CONSOLE = {};


CONSOLE.init = function() {

	CONSOLE.PLUGINS_LIST = [];

	CONSOLE.FONTS = [
		{
			"name": "MONOSPACE",
			"font": "monospace"
		},
		{
			"name": "JETBRAINS_MONO",
			"font": "JetBrains Mono"
		},
		{
			"name": "SOURCE_CODE_PRO",
			"font": "Source Code Pro"
		},
		{
			"name": "FIRA_CODE",
			"font": "Fira Code"
		},
		{
			"name": "M_PLUS_1_CODE",
			"font": "M PLUS 1 Code"
		}
	]
	CONSOLE.getPlugins = function(page = "") {
		$.get("https://playerservers.com/dashboard/plugins/?sort=" + page).then((res) => {
			if(document.querySelector(".injected-plugin-page")) {
				document.querySelector(".injected-plugin-page").remove();
			}
			document.body.innerHTML += `<div style="width:0;height:0;display:none" class="injected-plugin-page">${res}</div>`;

			const el = document.querySelector(".injected-plugin-page");

			const table = el.querySelector(".table.dataTables-users");
			const tb = table.querySelector("tbody");

			const tbc = tb.children;
			
			for (let i = 0; i < tbc.length; i++) {
				const td = tbc[i].querySelector("td");
				td.querySelector("a").remove();
				CONSOLE.PLUGINS_LIST.push(td.innerText);
			}
		})
	}
}

// document.body.innerHTML += 
// 	`
// 	<link src="stylesheet" href="https://terminal.znci.dev/css/index.css">
// 	<div class="console">
// 	<div class="content"></div>
// 	<div class="bottom">
// 		<input type="text" class="console-input fw">
// 	</div>
// </div>
// 	`

// terminal.initialise(
// 	{
// 		initMessage: "Welcome to the console!",
// 		terminalContainer: ".console",
// 		terminalContent: ".console .content",
// 		terminalInput: ".console .bottom .console-input",
// 	}
// )
terminal.createCommand(
	[
		{
			"command": "help",
			"function": () => {
				return `Help command`;
			}
		}
	]
)

async function toggleConsole() {

	console.log("Toggled control panel");

	if(CONSOLE_OPENED === false) {
		CONSOLE_OPENED = true;

		const elheader = document.querySelector(".console-header");
		const elinput = document.querySelector(".console-input-input");
		const elcontent = document.querySelector(".console-content");
		const elcontainer = document.querySelector(".console-container");

		function updateConsole() {
			elcontent.innerHTML = CONSOLE_LOG.replace(/:nl:/g, "<br>")
		}
		updateConsole();

		elheader.addEventListener("mousedown", () => {
			document.onmousemove = function(e) {
				const el = document.querySelector(".console-container");
				el.style.top = `${e.clientY-20}px`
				el.style.left = `${e.clientX-50}px`
			}
		})
		elinput.addEventListener("keypress", (e) => {
			if(e.key === "Enter") {
				e.preventDefault();
				let returned = "";
				const value = elinput.value;
				let split = value.toString().split(" ");
				let command = split[0];
				split.shift();
				let args = split;
				switch(command) {
					case "cl_console_font":
						let c_font = "";
						const fonts = CONSOLE.FONTS;
						if(args[0]) {
							const font = args[0];
							if(!fonts.includes(font)) {
								returned = `Unknown font`;
							}
							fonts.forEach(v => {
								if(font === v.name) {
									c_font = v.name;
									returned = `Set console font to ${c_font}`
									elcontainer.style.fontFamily = v.font;
								}
							});
						} else {
							returned = `Usage: ${command} {font}`
						}
						break;
					case "sv_installed_plugins":
						returned = `Installed Plugins: ${CONSOLE.PLUGINS_LIST.join(",")}`;
						break;
					case "cc_suggestion":
						let query = args[0];
						if(!query) {
							query = ""
						}
						$.get("https://cubedcraft.com/suggestions/search_api/?q=" + query).then((res) => {
							console.log(res);
						});
						returned = `Installed Plugins: ${CONSOLE.PLUGINS_LIST.join(",")}`;
						break;
					default:
						returned = `Unknown Command`
						break;
				}
				elinput.value = ""
				CONSOLE_LOG += `${__timeStr(`${returned}:nl:`)}`
				updateConsole();
			}
		})
		elheader.addEventListener("mouseup", () => {
			document.onmousemove = null;
		})
	} else {
		CONSOLE_OPENED = false;
		document.querySelector(".console-container").remove();
	}
}

document.onkeypress = function (e) {
    e = e || window.event;
    
	const k = e.key;

	if(k === config.console.key) {
		toggleConsole();
	}

};

if(document.location.pathname === config.routes.plugins) {
	let preInstalledPluginPacks = [
		{
			"name": "idk",
			"version": "1.17",
			"id": 1,
			"install": [
				"Skript",
				"SkBee",
				"Ersatz",
				"SkDragon",
				"Skellett",
				"SkQuery",
				"skRayFall",
				"MongoSK",
				"ProtocolLib",
				"FastAsyncWorldEdit",
				"VoxelSniper",
			],
			"remove": [
				"WorldEdit" // Incompatible with FAWE
			]
		}
	]
	function addPPack(pack) {
		const dataTableRow = document.querySelector(".table-responsive .row");
		
		// Create new row

		dataTableRow.insertAdjacentHTML("afterbegin", 
		`
		<div class="row">
			<div class="col-sm-12 col-md-6">
				<div class="dataTables_length" id="DataTables_Table_0_length">
					<label>
						Display 
						<select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class="custom-select custom-select-sm form-control form-control-sm select-plugin-pack">
							<option value="10">10</option>
							<option value="25">25</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</select> 
						records per page
					</label>
				</div>
			</div>
		</div>
		`)
	}
	preInstalledPluginPacks.forEach((v) => {
		addPPack(v)
	})
}