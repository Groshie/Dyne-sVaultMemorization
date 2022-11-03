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
    var vaultText = world.GetRecentLines(35);
    var currentTime = new Date();
    var exists = 0;

    vaultText = vaultText.match(/(The .+?(contains|full|empty).+with.+[.])|(The \w+ contains.+[.])|(It is.+(full|empty) with: .+[.])|(^The.+?(contains|full|empty).+except.+[.])$/g);
    
    var vaultList = world.getVariable("vaults");
    var vaultObj = {};
    var newVaultList = "";
    var exists = 0;

    if (vaultList == "") {
        newVaultList = vaultName + ";" + vaultText + ";" + currentTime;
        world.note("Vault '" + vaultName + "' added!");
    } else {
        vaultList = vaultList.split("\r\n");

        for (row in vaultList) {
            if (row == "" || row == "\r\n") {
                continue
            }

            var thisRow = vaultList[row].split(";");
            vaultObj[thisRow[0]] = [thisRow[1], thisRow[2]];

            if (thisRow[0] == vaultName) {
                exists = 1;
            }
        }

        vaultObj[vaultName] = [vaultText, currentTime];

        for (vault in vaultObj) {
            newVaultList += vault + ";" + vaultObj[vault][0] + ";" + vaultObj[vault][1] + "\r\n";
        }

        newVaultList = newVaultList.substr(0, newVaultList.lastIndexOf("\r\n"));

        if (exists == 0) {
            world.note("Vault '" + vaultName + "' added!");
        } else {
            world.note("Vault '" + vaultName + "' replaced!");
        }
    }

    world.SetVariable("vaults", newVaultList);
    world.SaveState;
    return
}

// List vaults
function vaultList() {
    var vaultsList = world.getVariable("vaults");

    if (vaultsList == "") {
        world.note("No vaults recorded yet!");
        world.note("Use the 'vaultsAdd' command to add a vault!");
    } else {
        world.note("--- List of recorded vaults ---");
        world.note("");
        vaultsList = vaultsList.split("\r\n");

        for (line in vaultsList) {
            var thisLine = vaultsList[line].split(";");
            world.note(thisLine[0] + ", updated: " + thisLine[2]);
        }
        world.note("\r\n--- All recorded vaults listed ---");
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
    var exists = 0;
    vaultList = vaultList.split("\r\n");

    for (row in vaultList) {
        var thisLine = vaultList[row].split(";");

        if (thisLine[0] == vaultName) {
            exists = 1;
        } else {
            newVaultList += thisLine[0] + ";" + thisLine[1] + ";" + thisLine[2] + "\r\n";
        }
    }

    newVaultList = newVaultList.substr(0, newVaultList.lastIndexOf("\r\n"));

    if (exists == 0) {
        world.note("No such vault found! (Case-sensitive)");
    } else {
        world.note("Vault with name '" + thisLine[0] + "' was removed!");
    }

    world.SetVariable("vaults", newVaultList);
    world.SaveState;
    return
}

// Helpfile
function vaultHelp() {
    world.note("");
    world.note("--- HELP FOR VAULT MEMORIZATION ---");
    world.note("");
    world.note("To add a vault, first look at your chosen container, then use the 'vaultsAdd'-command!\r\n")
    world.note("");
    world.note("The following (case-sensitive) commands are available:");
    world.note("'vaultsAdd': Adds a vault to the list (auto-overwrites if an entry already exists).");
    world.note("'vaults': Shows your current list of vaults and when they were last updated.");
    world.note("'vaultsShow <vault>': Shows chosen vault contents if in list.");
    world.note("'vaultsRemove <vault>': Removes chosen vault if it has been added to your list.");
    world.note("'vaultsHelp': Shows this information.");
    world.note("");
    world.note("-- HELP END ---");
    return
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