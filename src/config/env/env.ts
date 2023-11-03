import { z } from "zod";

const envSchema = z.object({
  DISCORD_TOKEN: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv
        extends z.infer<typeof envSchema> {}
  }
}