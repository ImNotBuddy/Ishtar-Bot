// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require("discord.js");
require("dotenv/config");

const eventHandler = require("./handlers/eventHandler");
const commandHandler = require("./handlers/commandHandler");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

eventHandler(client);
commandHandler(client);

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
// client.once(Events.ClientReady, c => {
//     console.log(`${c.user.tag} is now ready and operational`)
//     c.user.setActivity({ name: "/help", type: ActivityType.Listening })
// });

client.login(process.env.DISCORD_TOKEN);