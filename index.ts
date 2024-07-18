

import {
  Client,
  GatewayIntentBits,
  Partials,
  Events,
  InteractionType,  
} from 'discord.js'

import {
  loadCommandsInteraction,
  refreshCommands,
} from './src/components/LoadCommands.js'
import { loadEvents } from './src/components/loadEvents.js'
import { logMessage, logError } from './src/libs/logger.js'
import './src/config/env/env.js'

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
  })

  client.on(Events.ClientReady, async (): Promise<void> => {
    if (client.user !== null) {
      logMessage(`Logged in as ${client.user.tag}!`)

      await refreshCommands(client)
    }
  })

  client.on(
    Events.InteractionCreate,
    async (interaction): Promise<void> => {
      switch (interaction.type) {
        case InteractionType.ApplicationCommand:
          await loadCommandsInteraction(client, interaction)
          break
        default:
          logError(`Unknown interaction type | ${interaction.type}`)
          break
      }
    },
  )

  loadEvents(client)

  client.login(process.env.DISCORD_TOKEN).then().catch()
}


main()
  .then()
  .catch((err) => {
    throw err
  })
