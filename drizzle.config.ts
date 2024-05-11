import type { Config } from "drizzle-kit";
import { cwd } from "process";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(cwd());
export const connectionString =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL
    : process.env.LOCAL_DATABASE;

export default {
  schema: "./database/schema.ts",
  driver: "pg",
  out: "./database/migrations",
  dbCredentials: {
    connectionString: connectionString!,
  },
  verbose: true,
} satisfies Config;
