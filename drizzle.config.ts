import type { Config } from "drizzle-kit";
import { cwd } from "process";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(cwd());
export const connectionString = process.env.DATABASE_URL;

export default {
  schema: "./database/schema.ts",
  driver: "pg",
  out: "./database/migrations",
  dbCredentials: {
    connectionString: connectionString!,
  },
  verbose: true,
} satisfies Config;
