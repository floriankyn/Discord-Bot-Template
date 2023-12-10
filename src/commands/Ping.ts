// Path: src/commands/Ping.ts
import {
  Client,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';

class Ping {
  client: Client;
  interaction: ChatInputCommandInteraction;

  constructor(client: Client, interaction: ChatInputCommandInteraction) {
    this.client = client;
    this.interaction = interaction;
  }

  public async start() {
    await this.interaction.reply({
      content: 'Pong!',
    });
  }
}

export default {
  name: 'ping',
  command: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    await new Ping(client, interaction).start();
  },
};
