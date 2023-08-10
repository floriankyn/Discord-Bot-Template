//Command.js//
const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const { ModelsLoader } = require("../helpers/ModelsLoader.js");

class Command {
    constructor(client, interaction, db) {
        this.embeds = new ModelsLoader(client).models.command.embeds;
        this.modals = new ModelsLoader(client).models.command.modals;
        this.interaction = interaction;
        this.client = client;
        this.db = db;
    }

    async startCmd() {
        await this.interaction.deferReply({fetchReply: true, ephemeral: true})
            .then(async (message) => {
                if(this.interaction.member.permissions.has("Administrator")) {
                    await this.commandFlow(message.id);
                } else {
                    await this.interaction.webhook.editMessage(message.id,
                        this.embeds.PermissionsError(this.interaction)
                    ).then().catch(console.error);
                }
            })
            .catch(console.error);
    }

    async commandFlow(messageId) {

    }
}

module.exports = {
    name: "command",
    description: "Template description for the command.",
    command: new SlashCommandBuilder()
        .setName("command")
        .setDescription("Template description for the command.")
        .setDefaultMemberPermissions(new PermissionsBitField(PermissionsBitField.Flags.SendMessages).bitfield),
    runCmd: async (client, interaction, db) => {
        await new Command(client, interaction, db).startCmd();
    }
}