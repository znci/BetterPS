
/*

	Plugins

*/

document.body.innerHTML += `<script src=""></script>`

// I hate admin lte, and there is 1000% an easier way of this

$('link[rel=stylesheet][href~="/templates/Dashboard/assets/css/adminlte.min.css"]').remove();

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
function makeNavItem(text, icon, href) {
	const navbar = document.querySelector(".nav-sidebar");
	navbar.innerHTML += `
	<li class="nav-item betterps-navbar">
		<a class="nav-link betterps-link" href="${href}" target="_blank">
			<i class="nav-icon ${icon}"></i>
			<p>
				${text}
			</p>
		</a>
	</li>
	`
}
window.onload = () => {
	const navbar = document.querySelector(".nav-sidebar");
	navbar.innerHTML += `
		<a href="https://github.com/zNotChill/BetterPS" class="brand-link">
			<span class="brand-text font-weight-light">BetterPS</span>
		</a>
	`
	makeNavItem("My GitHub", "fab fa-github", "https://github.com/zNotChill")
	makeNavItem("Skript Dir", "nav-icon fas fa-folder", "https://playerservers.com/dashboard/filemanager/&dir=/plugins/Skript/scripts")
	makeNavItem("spigot.yml", "nav-icon fas fa-file", "https://playerservers.com/dashboard/filemanager/&action=edit&medit=/spigot.yml")
	navbar.innerHTML += `
		<li class="nav-item betterps-item has-treeview">
			<a class="nav-link" style="cursor:pointer;">
				<i class="nav-icon fas fa-cogs"></i>
				<p>
					More
					<i class="right fa fa-angle-left"></i>
				</p>
			</a>
			<ul class="nav nav-treeview" style="display: none;">
				<li class="nav-item">
					<li class="nav-item betterps-item has-treeview">
						<a class="nav-link" style="cursor:pointer;">
							<i class="fas fa-toolbox"></i>
							<p>
								Utilities
								<i class="right fa fa-angle-left"></i>
							</p>
						</a>
						<ul class="nav nav-treeview" style="display: none;">
							<li class="nav-item">
								<a href="" style="margin-left:10px;" class="nav-link betterps-item" onclick="getGoodPlugins()">
									<i class="fas fa-plug"></i>
									<p>Get Good Plugins</p>
								</a>
							</li>
						</ul>
					</li>
				</li>
           </ul>
		</li>
	`
}
/*
*/