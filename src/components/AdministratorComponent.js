//AdministratorComponent.js// -- Created By Florian Lepage
const Command = require("../commands/Command.js");

class AdministratorComponent {
    constructor(client, interaction, db) {
        this.client = client;
        this.interaction = interaction;
        this.db = db;
    }

    async onInteraction() {
        if(this.interaction.isChatInputCommand()) {
            if(this.interaction.member.permissions.has("Administrator")) {
                await this.selector();
            }
        }
    }

    async selector() {
        switch (this.interaction.commandName) {
            case "Command":
                await Command.runCmd(this.client, this.interaction, this.db);
                break;
        }
    }
}

module.exports = {
    AdministratorComponent,
}