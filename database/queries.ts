import {
	DetailedUser,
	Vehicle,
	Subscription,
	DetailedSubscription,
} from '@/types/types';
import { db } from '.';
import { vehicles, subscriptions, users } from './schema';
import { eq } from 'drizzle-orm';

/**
 * Fetches all vehicles for a given user id.
 *
 * @param userId The ID of the user.
 * @returns An array of all {@link Vehicle} objects for the user.
 */
export const getUserVehicles = async (userId: number): Promise<Vehicle[]> => {
	const rows = await db
		.select()
		.from(vehicles)
		.where(eq(vehicles.userId, userId));
	return rows;
};

/**
 * Fetches all subscriptions for a given user id.
 *
 * @param userId The ID of the user.
 * @returns An array of all {@link Subscription} objects for the user.
 */
export const getUserSubscriptionsWithVehicles = async (
	userId: number
): Promise<DetailedSubscription[]> => {
	const rows = await db
		.select({
			subscriptions,
			vehicle: vehicles,
			user: users,
		})
		.from(subscriptions)
		.leftJoin(vehicles, eq(subscriptions.vehicleId, vehicles.id))
		.leftJoin(users, eq(vehicles.userId, users.id))
		.where(eq(users.id, userId));

	//@ts-ignore
	return rows.map((row) => {
		return {
			...row.subscriptions,
			vehicle: row.vehicle,
			user: row.user,
		};
	});
};

/**
 * Fetches a user and all associated vehicles and subscriptions.

 * @param userId
 * @returns A {@link DetailedUser}.
 */
export const getDetailedUser = async (
	userId: number
): Promise<DetailedUser> => {
	const rows = await db.select().from(users).where(eq(users.id, userId));
	if (rows.length === 0) {
		throw new Error(`No such user (id: ${userId})`);
	}

	const user = rows[0];
	const userSubscriptions = await getUserSubscriptionsWithVehicles(user.id);

	return {
		...user,
		subscriptions: userSubscriptions,
	};
};

/**
 * Calls {@link getDetailedUser} for all users in the database.
 * @returns  An array of {@link DetailedUser} objects.
 */
export const getAllDetailedUsers = async (): Promise<DetailedUser[]> => {
	const allUsers = await db.select().from(users);
	const userPromises = allUsers.map((user) => getDetailedUser(user.id));
	const results = await Promise.allSettled(userPromises);

	const detailedUsers: DetailedUser[] = [];
	const errors: { userId: number; error: any }[] = [];

	results.forEach((result, index) => {
		if (result.status === 'fulfilled') {
			detailedUsers.push(result.value);
		} else {
			const userId = allUsers[index].id;

			errors.push({
				userId,
				error: result.reason,
			});
		}
	});

	if (errors.length) {
		console.error('Errors fetching user details:', errors);
	}

	return detailedUsers;
};
