import {
  InteractionResponse,
  ChatInputCommandInteraction,
  ButtonInteraction,
} from 'discord.js';
import { logError } from './logger.js';

export const initDiscordMessage = (
  interaction: ChatInputCommandInteraction,
  ephemeral: boolean = true,
  fetchReply: boolean = true
): Promise<InteractionResponse> => {
  return interaction.deferReply({
    ephemeral: ephemeral,
    fetchReply: fetchReply,
  });
};

export const handleError = async (
  error: Error,
  interaction: ChatInputCommandInteraction | ButtonInteraction,
  followUp: boolean = false
): Promise<void> => {
  const errorMessage = error.message;

  if (followUp) {
    await interaction
      .followUp({
        content: `> ⛔️ ${errorMessage}`,
        ephemeral: true,
      })
      .then(() => logError(error.message))
      .catch((e) => logError(e.message));
  } else {
    await interaction
      .editReply({
        content: `> ⛔️ ${errorMessage}`,
      })
      .then(() => logError(error.message))
      .catch((e) => logError(e.message));
  }
};

export const descriptionFormatter = (jobDesc: string) => {
  let description = jobDesc;

  for (let i = 0; description.length; i++) {
    description = description.replace('&eacute;', 'é');
    description = description.replace('&rsquo;', "'");
    description = description.replace('&ocirc;', 'ô');
    description = description.replace('&ccedil;', 'ç');
    description = description.replace('&euml;', 'ë');
    description = description.replace('&acirc;', 'â');
    description = description.replace('&icirc;', 'î');
    description = description.replace('&ucirc;', 'û');
    description = description.replace('&ecirc;', 'ê');
    description = description.replace('&ugrave;', 'ù');
    description = description.replace('&quot;', "'");
    description = description.replace('&Eacute', 'é');
    description = description.replace('&egrave', 'è');
    description = description.replace('&#39;', "'");
    description = description.replace('&agrave;', 'à');
    description = description.replace('<strong>', '**');
    description = description.replace('</strong>', '**');
    description = description.replace('<li>', '- ');
    description = description.replace('</li>', '');
    description = description.replace('<span>', '');
    description = description.replace('</span>', '');
    description = description.replace('</u>', '');
    description = description.replace('<u>', '');
    description = description.replace('\n<ul>', '');
    description = description.replace('</ul>\n', '');
    description = description.replace('</p>', '');
    description = description.replace('<p>', '');
    description = description.replace('&ecirc;', '');
    description = description.replace('<br />', '');
    description = description.replace('&nbsp;', '');
    description = description.replace('<h1>', '**');
    description = description.replace('</h1>', '**');

    description = description.replace('<h2>', '**');
    description = description.replace('</h2>', '**');

    description = description.replace('<h3>', '**');
    description = description.replace('</h3>', '**');

    description = description.replace('<h4>', '**');
    description = description.replace('</h4>', '**');

    description = description.replace('<h5>', '**');
    description = description.replace('</h5>', '**');

    description = description.replace('<h6>', '**');
    description = description.replace('</h6>', '**');
    description = description.replace(/(<([^>]+)>)/gi, '');
  }

  if (description.length >= 4096) {
    description = description.substring(0, 4093);
    description += '...';
  }

  return description;
};
