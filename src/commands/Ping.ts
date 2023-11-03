// Path: src/commands/Ping.ts

import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';

/**
 * Represents a Ping command.
 */
class Ping {
  /**
   * The client instance.
   * @type {Client}
   */
  client: Client;

  /**
   * The command interaction.
   * @type {CommandInteraction}
   */
  interaction: CommandInteraction;

  /**
   * Creates a Ping instance.
   * @param {Client} client - The client instance.
   * @param {CommandInteraction} interaction - The command interaction.
   */
  constructor(client: Client, interaction: CommandInteraction) {
    this.client = client;
    this.interaction = interaction;
  }

  /**
   * Starts the execution of the Ping command.
   */
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

  /**
   * Runs the ping command.
   * @param {Client} client - The client instance.
   * @param {CommandInteraction} interaction - The command interaction.
   */
  run: async (client: Client, interaction: CommandInteraction) => {
    await new Ping(client, interaction).start();
  },
};
