import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import dotenv from "dotenv";

dotenv.config();
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("No DATABASE_URL provided");
  process.exit(1);
}

const client = postgres(connectionString, {
  prepare: false,
});

console.log("Connecting to database...");
export const db = drizzle(client, { schema });
console.log("Database connection established");
