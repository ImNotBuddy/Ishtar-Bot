const fs = require("node:fs");
const path = require("node:path");

module.exports = (client) => {
    const commandsFolderPath = path.join(__dirname, "../commands");
    const commandsFolder = fs.readdirSync(commandsFolderPath);

    let totalCommands = 0;
    let loadedCommands = 0;

    console.log("[Command Handler] Loading commands...");

    for (const folder of commandsFolder) {
        const commandsPath  = path.join(commandsFolderPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith("js"));

        totalCommands += commandFiles.length;

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);

            if ("data" in command && "execute" in command) {
                client.commands.set(command.data.name, command);
                loadedCommands++;
            } else {
                console.log(`[Command Handler] The command '${file}' has not been loaded due to missing a required "data" or "execute" property.`);
            }
        }
    }

    console.log(`[Command Handler] Loaded ${loadedCommands}/${totalCommands} commands`);
}