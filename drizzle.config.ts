import '@/database/envConfig';
import {defineConfig} from 'drizzle-kit';

export default defineConfig({
	schema: './database/schema.ts',
	out: './database/migrations',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.POSTGRES_URL!,
	},
	verbose: true,
});
