import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { connectionString } from '@/drizzle.config';

if (!connectionString) throw new Error('DATABASE_URL not found in .env.local');

const client = postgres(connectionString, {
	prepare: false,
});
export const db = drizzle(client);
