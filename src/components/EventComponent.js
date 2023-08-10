//EventComponent.js//
const Command = require("../events/Command.js");

class EventComponent {
    constructor(client, db) {
        this.client = client;
        this.db = db;
    }

    async commandEvent() {
        await Command.commandEvent(this.client, this.db);
    }
}


module.exports = {
    EventComponent,
}