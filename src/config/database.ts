import { PrismaClient } from '@prisma/client';

import { logError, logMessage } from '../lib/logger';

const prisma: PrismaClient = new PrismaClient();

export const getPrisma = (): PrismaClient => {
  return prisma;
};

export const connectPrisma = async (): Promise<void> => {
  try {
    await prisma.$connect();
    logMessage('Connected to database');
  } catch (error) {
    const errorMessage = error as Error;
    logError(errorMessage.message);
  }
};
