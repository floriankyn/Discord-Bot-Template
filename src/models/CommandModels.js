//CommandModels.js//
const {
    EmbedBuilder, ActionRowBuilder, ButtonBuilder,
    ModalBuilder, TextInputStyle, TextInputBuilder, StringSelectMenuBuilder
} = require("discord.js");

module.exports = {
    embeds: {
        PermissionsError: (interaction) => {
            return {
                ephemeral: true,
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Error")
                        .setDescription("You are not allowed to use this command.")
                        .setColor("Red")
                        .setFooter(
                            {
                                text: interaction.guild.name,
                                iconURL: interaction.guild.iconURL()
                            }
                        )
                        .setTimestamp()
                ]
            }
        }
    },
    modals: {

    }
};