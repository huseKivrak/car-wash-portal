import type { Config } from 'drizzle-kit';
import { cwd } from 'process';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(cwd());

const useLocalDb = process.env.USE_LOCAL_DB === 'true';

export const connectionString = useLocalDb
	? process.env.LOCAL_DB
	: process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL not found in .env.local');

export default {
	schema: './database/schema.ts',
	driver: 'pg',
	out: './drizzle',
	dbCredentials: {
		connectionString: connectionString,
	},
} satisfies Config;
