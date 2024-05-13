import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { connectionString } from "@/drizzle.config";
import * as schema from "./schema";

const connection = postgres(connectionString!, { prepare: false });

const db = drizzle(connection, { schema, logger: false });
export * from "./schema";
export { db };
