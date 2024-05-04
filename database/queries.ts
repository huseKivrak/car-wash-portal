import {DetailedUser, Vehicle, Subscription} from '@/types/types';
import {db} from '.';
import {vehicles, subscriptions, users} from './schema';
import {eq} from 'drizzle-orm';

export const getUserSubscriptions = async (
	userId: number
): Promise<Subscription[]> => {
	const rows = await db
		.select({
			subscriptions,
		})
		.from(subscriptions)
		.leftJoin(vehicles, eq(subscriptions.vehicleId, vehicles.id))
		.leftJoin(users, eq(vehicles.userId, users.id))
		.where(eq(users.id, userId));
	return rows.map((row) => row.subscriptions);
};

export const getUserVehicles = async (userId: number): Promise<Vehicle[]> => {
	const rows = await db
		.select()
		.from(vehicles)
		.where(eq(vehicles.userId, userId));
	return rows;
};

export const getDetailedUser = async (
	userId: number
): Promise<DetailedUser> => {
	const rows = await db.select().from(users).where(eq(users.id, userId));
	if (rows.length === 0) {
		throw new Error(`No such user (id: ${userId})`);
	}

	const user = rows[0];
	const userSubscriptions = await getUserSubscriptions(user.id);
	const userVehicles = await getUserVehicles(user.id);

	return {
		...user,
		vehicles: userVehicles,
		subscriptions: userSubscriptions,
	};
};
