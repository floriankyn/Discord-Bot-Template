//Command.js//
const { ModelsLoader } = require("../helpers/ModelsLoader.js");

class Command {
    constructor(client, db) {
        this.client = client;
        this.db = db;
        this.embeds = new ModelsLoader(client).models.command.embeds;
        this.modals = new ModelsLoader(client).models.command.modals;
    }

    async commandEvent() {

    }
}

module.exports = {
    name: "command event",
    description: "Class triggered by an event.",
    commandEvent: async (client, db) => {
        await new Command(client, db).commandEvent();
    },
}