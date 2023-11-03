// Path: src/components/CommandComponent.ts
import { readdirSync } from 'fs';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction, REST, Routes } from 'discord.js';
import { logMessage, logError, logUserAction } from '../utils/logger';

const bannedCommands: string[] = ['/ping'];

let Cache: Command[] = [];

interface Command {
  default: {
    name: string;
    command: SlashCommandBuilder;
    run: (client: Client, interaction: CommandInteraction) => Promise<void>;
  };
}

const getCommands = async (): Promise<Command[]> => {
  return new Promise(async (resolve) => {
    const commandSource = `${__dirname}/../../dist/commands/`;
    const commandFile = readdirSync(commandSource);

    const commands: Command[] = [];

    for (const command of commandFile) {
      const cmd: Command = await import(commandSource + command);
      if (!bannedCommands.includes(cmd.default.name)) {
        commands.push(cmd);
      }
    }

    Cache = commands;

    resolve(commands);
  });
};

export const refreshCommands = async (client: Client): Promise<void> => {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  const cmds: Command[] = await getCommands();

  const commands: SlashCommandBuilder[] = [];
  for (const cmd of cmds) {
    commands.push(cmd.default.command);
  }

  const commandNames: string[] = [];

  for (const cmd of cmds) {
    commandNames.push(cmd.default.name);
  }

  logMessage(`Loaded commands: ${commandNames.join(', ')}`);

  if (client.user !== null) {
    try {
      await rest.put(Routes.applicationCommands(client.user.id), {
        body: commands,
      });

      logMessage(`Successfully reloaded application (/) commands.`);
    } catch (error) {
      logError(`Failed to reload application (/) commands.`);
    }
  }
};

export const loadCommandsInteraction = async (
  client: Client,
  interaction: CommandInteraction,
): Promise<void> => {
  const cmds: Command[] = Cache;

  const commandNames: string[] = [];

  for (const cmd of cmds) {
    commandNames.push(cmd.default.name);
  }

  const command = cmds.find(
    (cmd) => cmd.default.name === interaction.commandName,
  );

  if (command !== undefined) {
    logUserAction(interaction.user, command.default.name, interaction?.channel);
    await command.default.run(client, interaction);
  }
};
