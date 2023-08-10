//CommandsLoader.js// -- Created By Florian Lepage
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const fs = require("fs");
const path = require("path");

class CommandsLoader {
    constructor(client) {
        this.client = client;
    }

    async loadCommands() {
        const { REST, Routes } = require('discord.js');


        let commands = [];

        fs.readdirSync(__dirname + "/../commands/").forEach((file) => {
            if (file.endsWith('.js')) {
                const commandsModule = require(path.join(__dirname + "/../commands/", file));
                commands.push(commandsModule.command);
            }
        });

        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

        try {
            await rest.put(Routes.applicationCommands(this.client.user.id), { body: commands });
            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }

    }
}

module.exports = {
    CommandsLoader
}