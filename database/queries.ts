import {db} from '.';
import {vehicles, subscriptions, users} from './schema';
import {eq} from 'drizzle-orm';

export const getUserSubscriptions = async (userId: number) => {
	return await db
		.select({
			subscriptions,
		})
		.from(subscriptions)
		.leftJoin(vehicles, eq(subscriptions.vehicleId, vehicles.id))
		.leftJoin(users, eq(vehicles.userId, users.id))
		.where(eq(users.id, userId));
};
