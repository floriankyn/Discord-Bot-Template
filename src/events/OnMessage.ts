import { Client, Events, Message } from 'discord.js';

import { logError, logMessage } from '../libs/logger.js';

class JobsButtons {
  client: Client;
  message: Message;
  constructor(client: Client, message: Message) {
    this.client = client;
    this.message = message;
  }

  public async run() {
    try {
      logMessage(
        `Message from ${this.message.author.tag} in ${this.message.guild?.name} (${this.message.guild?.id})`
      );
    } catch (error) {
      const errMessage = error as Error;
      logError(errMessage.message);
    }
  }
}

export default {
  name: 'on_message',
  event: Events.MessageCreate,
  run: async (client: Client, message: Message) => {
    await new JobsButtons(client, message).run();
  },
};