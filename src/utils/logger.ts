import { existsSync, mkdirSync } from 'fs';

import { join } from 'path';

import { createLogger, format, transports } from 'winston';

import { TextBasedChannel, User } from 'discord.js';

if (!existsSync('logs')) {
  mkdirSync('logs');
}

const logFileName = join('logs', `${new Date().toISOString()}.log`);

const Logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    }),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: logFileName }),
  ],
});

export const logUserAction = (
  user: User | null,
  command: string,
  channel: TextBasedChannel | null,
): void => {
  Logger.info(
    `User ${user?.username}#${user?.discriminator} (${user?.id}) ran command ${command} in channel ${channel?.isTextBased.name} (${channel?.id})`,
  );
};

export const logError = (message: string): void => {
  Logger.error(message);
};

export const logMessage = (message: string): void => {
  Logger.info(message);
};
