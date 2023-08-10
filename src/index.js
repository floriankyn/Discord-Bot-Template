//index.js// -- Created By FLorian Lepage
const { Client, GatewayIntentBits, Partials } = require('discord.js');

require("dotenv").config(
    {
        path: __dirname + "/../.env"
    }
);

const main = async () => {
    const client = new Client(
        {
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.DirectMessageReactions,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildIntegrations
            ], partials: [
                Partials.Channel,
                Partials.Reaction,
                Partials.Message,
                Partials.GuildMember
            ]
        }
    );

    //Helpers imports
    const {CommandsLoader} = require("./helpers/CommandsLoader.js");
    const {DatabaseManager} = require("./helpers/DatabaseManager.js");

    //Components Imports
    const {AdministratorComponent} = require("./components/AdministratorComponent.js");
    const {EventComponent} = require("./components/EventComponent.js");
    const {UserComponent} = require("./components/UserComponent.js");

    const db = await new DatabaseManager();

    client.on('ready', async() => {
        console.log(`Logged in as ${client.user.tag}!`);
        await db.checkConnectionState();

        await new CommandsLoader(client).loadCommands();
        await new EventComponent(client, db).commandEvent();
    });

    client.on('interactionCreate', async interaction => {
        await new AdministratorComponent(client, interaction, db).onInteraction();
        await new UserComponent(client, interaction, db).onInteraction();
    });


    client.login().then().catch();
}

main().then().catch((err) => {
    throw err;
});