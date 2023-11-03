// Path: src/commands/Ping.ts

import {
    Client, CommandInteraction, SlashCommandBuilder
} from "discord.js";

class Ping {
    client: Client;
    interaction: CommandInteraction;
    constructor(client: Client, interaction: CommandInteraction) {
        this.client = client;
        this.interaction = interaction;
    }

    public async start() {
        await this.interaction.reply({
              content: "Pong!"
        });
    }
}

export default {
    name: "ping",
    command: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    run: async (client: Client, interaction: CommandInteraction) => {
        await new Ping(client, interaction).start();
    }
};