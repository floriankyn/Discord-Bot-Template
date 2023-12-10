// Path: src/models/ping.ts
import {
  Client,
  GatewayIntentBits,
  Partials,
  Events,
  Interaction,
  InteractionType,
} from 'discord.js';
import {
  loadCommandsInteraction,
  refreshCommands,
} from '../components/LoadCommands.js';
import { loadEvents } from '../components/LoadEvents.js';
import { logMessage, logError } from '../lib/logger';
import { connectPrisma } from './database';
import { main as mainServer } from '../server/webhook';
import './env/env.js';

// import { WhitelistEvent} from '../events/whitelist.js';

const main = async () => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.DirectMessageReactions,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildIntegrations,
    ],
    partials: [
      Partials.Channel,
      Partials.Reaction,
      Partials.Message,
      Partials.GuildMember,
    ],
  });

  client.on(Events.ClientReady, async (): Promise<void> => {
    if (client.user !== null) {
      logMessage(`Logged in as ${client.user.tag}!`);

      await refreshCommands(client);

      await connectPrisma();

      mainServer()
        .then()
        .catch((err: Error) => {
          throw err;
        });
    }
  });

  client.on(
    Events.InteractionCreate,
    async (interaction: Interaction): Promise<void> => {
      switch (interaction.type) {
        case InteractionType.ApplicationCommand:
          await loadCommandsInteraction(client, interaction);
          break;
        default:
          logError(`Unknown interaction type | ${interaction.type}`);
          break;
      }
    }
  );

  loadEvents(client);

  client.login(process.env.DISCORD_TOKEN).then().catch();
};

main()
  .then()
  .catch((err) => {
    throw err;
  });
