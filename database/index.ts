import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { connectionString } from "@/drizzle.config";
import * as schema from "./schema";

let connection = postgres(connectionString!, { prepare: false });

const globalConnection = global as typeof globalThis & {
  connection: postgres.Sql;
};

if (!globalConnection.connection) {
  globalConnection.connection = postgres(connectionString!, {
    prepare: false,
  });
}

connection = globalConnection.connection;

const db = drizzle(connection, { schema, logger: false });
export * from "./schema";
export { db };
