//UserComponent.js// -- Created By Florian Lepage
const fs = require("fs");
const Command = require("../commands/Command.js");

class UserComponent {
    constructor(client, interaction, db) {
        this.client = client;
        this.interaction = interaction;
        this.db = db;
    }

    async onInteraction() {
        if(this.interaction.isChatInputCommand()) {
            await this.selector("cmd");
        } else if (this.interaction.isButton()) {
            await this.selector("btn");
        }
    }

    async selector(type) {
        if(type === "cmd") {
            switch (this.interaction.commandName) {
                case "Command":
                    await Command.runCmd(this.client, this.interaction, this.db);
                    break
            }
        } else if (type === "btn") {

        }
    }
}

module.exports = {
    UserComponent,
}