import {
  EmbedBuilder,
  ColorResolvable,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  APIEmbedField,
  EmbedFooterOptions,
  EmbedAuthorOptions,
} from 'discord.js';

import { MessageModel } from '../types/model';

export const Ping = (whitelist: boolean = false): MessageModel => {
  const description = 'description';

  const embedFields: APIEmbedField[] = [
    {
      name: 'Contract',
      value: `Value`,
      inline: true,
    },
    {
      name: 'Location',
      value: `Value`,
      inline: true,
    },
    {
      name: 'Salary',
      value: `Value`,
      inline: true,
    },
  ];

  const embedColor: ColorResolvable = 'Blue';

  const embedFooter: EmbedFooterOptions = {
    text: 'Stack Talent',
  };
  const embedAuthor: EmbedAuthorOptions = {
    name: 'author',
  };

  const embed = new EmbedBuilder()
    .setAuthor(embedAuthor)
    .setColor(embedColor)
    .addFields(embedFields)
    .setTitle('title')
    .setDescription(description)
    .setFooter(embedFooter);

  const actionRow = new ActionRowBuilder<ButtonBuilder>();

  const applyButton = new ButtonBuilder()
    .setCustomId(`apply`)
    .setLabel('Apply')
    .setStyle(ButtonStyle.Primary)
    .setEmoji('📝');

  const notificationButton = new ButtonBuilder()
    .setCustomId(`notification`)
    .setLabel('Notification')
    .setStyle(ButtonStyle.Primary)
    .setEmoji('🔔');

  if (whitelist) {
    const whitelistButton: ButtonBuilder = new ButtonBuilder()
      .setCustomId(`whitelist_job`)
      .setLabel('Whitelist')
      .setStyle(ButtonStyle.Success);

    const blacklistButton: ButtonBuilder = new ButtonBuilder()
      .setCustomId(`blacklist_job`)
      .setLabel('Blacklist')
      .setStyle(ButtonStyle.Danger);

    actionRow.addComponents(whitelistButton, blacklistButton);
  } else {
    actionRow.addComponents(applyButton, notificationButton);
  }

  return {
    embeds: [embed],
    components: [actionRow],
    files: [],
    content: '',
  };
};
