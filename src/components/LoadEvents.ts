import { readdirSync } from 'fs';
import { Client, Events, Guild, Interaction } from 'discord.js';
import { logMessage, logError } from '../lib/logger';

type eventCollection = Interaction | Guild;

type eventCollectionType = Events.GuildCreate | Events.InteractionCreate;

interface Event {
  name: string;
  event: eventCollectionType;
  run: (client: Client, eventCollection: eventCollection) => Promise<void>;
}

const getEvents = async (): Promise<Event[]> => {
  return new Promise(async (resolve) => {
    const eventSource = `${__dirname}/../../dist/events/`;
    const eventFile = readdirSync(eventSource);

    const events: Event[] = [];

    for (const event of eventFile) {
      const evt = await import(eventSource + event);
      events.push(evt.default);
    }

    resolve(events);
  });
};

export const loadEvents = async (client: Client) => {
  try {
    const events: Event[] = await getEvents();

    for (const event of events) {
      client.on(event.event, async (eventCollection: eventCollection) => {
        await event.run(client, eventCollection);
      });
    }

    logMessage(
      `Loaded events: ${events.map((event) => event.name).join(', ')}`
    );
  } catch (error) {
    console.log(error);

    const errMessage = error as Error;
    logError(errMessage.message);
  }
};
