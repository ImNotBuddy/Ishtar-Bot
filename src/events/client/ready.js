const { ActivityType, Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.user.setActivity({ name: "/help | /invite", type: ActivityType.Listening });
        console.log(`[Client Ready] ${client.user.tag} is online`);
    }
}