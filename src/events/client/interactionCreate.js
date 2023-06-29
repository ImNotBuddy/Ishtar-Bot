const { Events, Interaction } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,

    /**
     * 
     * @param {Interaction} interaction 
     */

    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`[Interaction Create] No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`[Interaction Create] Error executing ${interaction.commandName}`);
            console.error(error);
        }
    }
}