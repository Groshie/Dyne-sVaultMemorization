/*
###########################
### Dyne's Vault Memory ###
###########################

#####################
# Contents:         #
# 1. Functions      #
# 2. Application    #
#####################
*/

// ### FUNCTIONS ###
// Add a vault (vaultsAdd <stored name>)
function vaultAdd(name, line, wildcards) {
    var vaultName = line.replace("vaultsAdd ", "");
    var vaultText = world.GetRecentLines(50);
    var currentTime = new Date();
    var exists = 0;

    vaultText = vaultText.match(/(The .+?(contains|full|empty).+with.+[.])|(It is.+(full|empty) with: .+[.])|(^The.+?(contains|full|empty).+except.+[.])$/g);
    
    var vaultList = world.getVariable("vaults");
    var newVaultList = "";

    if (vaultList == "") {
        newVaultList = vaultName + ";" + vaultText + ";" + currentTime + "\r\n";
        world.note("Vault " + vaultName + " added!");
    } else {
        vaultList = vaultList.split("\r\n");

        for (line in vaultList) {
            var thisLine = vaultList[line].split(";");

            if (thisLine[0] == vaultName) {
                newVaultList += vaultName + ";" + vaultText + ";" + currentTime + "\r\n";
                world.note("Vault " + vaultName + " replaced!");
                exists = 1;
                continue
            }

            newVaultList += thisLine;
        }

        if (exists == 0) {
            newVaultList += vaultName + ";" + vaultText + ";" + currentTime + "\r\n";
            world.note("Vault " + vaultName + " added!");
        }
    }

    world.SetVariable("vaults", newVaultList);
    return
}

// List vaults
function vaultList() {
    var vaultsList = world.getVariable("vaults");

    if (vaultsList == "") {
        world.note("No vaults recorded yet!");
    } else {
        vaultsList = vaultsList.split("\r\n");

        for (line in vaultsList) {
            var thisLine = vaultsList[line].split(";");
            world.note(thisLine[0]);
        }
        world.note("--- All recorded vaults listed ---");
    }
    return
}

// List contents of a vault
function vaultShow(name, line, wildcards) {
    var vaultName = line.replace("vaults ", "");
    var vaultList = world.getVariable("vaults");
    vaultList = vaultList.split("\r\n");

    for (line in vaultList) {
        var thisLine = vaultList[line].split(";");

        if (thisLine[0] == vaultName) {
            world.note("Vault name: " + thisLine[0]);
            world.note("Contents:\n" + thisLine[1]);
            world.note("Last updated: " + thisLine[2]);
            return
        }
    }

    world.note("No such vault found! (Case-sensitive)");
    return
}

// Remove a vault
function vaultRemove(name, line, wildcards) {
    var vaultName = line.replace("vaultsRemove ", "");
    var vaultList = world.getVariable("vaults");
    var newVaultList = "";
    vaultList = vaultList.split("\r\n");

    for (line in vaultList) {
        var thisLine = vaultList[line].split(";");

        if (thisLine[0] == vaultName) {
            world.note("Vault with name " + thisLine[0] + " was removed!")
            continue
        }

        newVaultList += thisLine;
    }

    world.SetVariable("vaults", newVaultList);
    return
}

// Helpfile
function vaultHelp() {
    world.note("To add a vault, first look at your chosen container, then use the 'vaultsAdd'-command!\r\n")
    world.note("The following (case-sensitive) commands are available:");
    world.note("'vaultsAdd': Adds a vault to the list (auto-overwrites).");
    world.note("'vaults': Shows your current list of vaults.");
    world.note("'vaultsShow <vault>': Shows chosen vault contents if in list.");
    world.note("'vaultsRemove <vault>': Removes chosen vault if in list.");
    world.note("'vaultsHelp': Shows this information.");
}


// ### APPLICATION ###
// Check if variable "vaults" exists
if (!world.getVariable("vaults")) {
	world.SetVariable("vaults", "");
    world.note("Dyne's Vault Memorization: 'vaults'-variable created!");
}

// Check if aliases are created
if (world.GetAliasOption("vaultsAdd", "enabled") == 1) {
	// Alias "vaultsAdd" is enabled
} else {
    // AddAlias("aliasName", "playercommand", "", 1, "Function")
    world.AddAlias("vaultsAdd", "vaultsAdd *", "", 1, "vaultAdd");
    world.AddAlias("vaultsList", "vaults", "", 1, "vaultList");
    world.AddAlias("vaultsShow", "vaults *", "", 1, "vaultShow");
	world.AddAlias("vaultsRemove", "vaultsRemove *", "", 1, "vaultRemove");
    world.AddAlias("vaultsHelp", "vaultsHelp", "", 1, "vaultHelp");
    world.Note("Dyne's Vault Memorization is initialized!");
}