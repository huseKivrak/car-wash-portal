import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { DefaultLogger, LogWriter } from 'drizzle-orm';
import fs from 'fs';
import { connectionString } from '@/drizzle.config';
if (!connectionString) throw new Error('DATABASE_URL not found in .env.local');

const client = postgres(connectionString, {

});
class MyLogWriter implements LogWriter {
	write(message: string) {
		fs.writeFileSync('./drizzle.log', message);
	}
}
const logger = new DefaultLogger({ writer: new MyLogWriter() });
export const db = drizzle(client, { schema, logger });
