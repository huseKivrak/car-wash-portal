import { DetailedUser } from '@/types/types';
import { db } from '.';
import { subscriptions, purchases, washes, vehicles } from './schema';
import { asc, desc, sql } from 'drizzle-orm';

const preparedAllUsers = db.query.users
	.findMany({
		with: {
			subscriptions: {
				orderBy: [desc(subscriptions.startDate)],
				with: {
					user: true,
					vehicle: true,
					washes: { orderBy: [desc(washes.createdAt)] },
					purchases: { orderBy: [desc(purchases.createdAt)] },
				},
			},
			vehicles: { orderBy: [desc(vehicles.updatedAt)] },
			washes: { orderBy: [desc(washes.updatedAt)] },
			purchases: { orderBy: [desc(purchases.updatedAt)] },
		},
	})
	.prepare('get_all_users_with_relations');

export async function getAllDetailedUsers(): Promise<DetailedUser[]> {
	const allUsers = await preparedAllUsers.execute();
	return allUsers;
}

const preparedUser = db.query.users
	.findFirst({
		where: (users, { eq }) => eq(users.id, sql.placeholder('id')),
		with: {
			subscriptions: {
				with: {
					user: true,
					vehicle: true,
					washes: { orderBy: [desc(washes.createdAt)] },
					purchases: { orderBy: [desc(purchases.updatedAt)] },
				},
				orderBy: [desc(subscriptions.updatedAt)],
			},
			vehicles: { orderBy: [desc(vehicles.updatedAt)] },
			washes: { orderBy: [desc(washes.updatedAt)] },
			purchases: { orderBy: [desc(purchases.updatedAt)] },
		},
	})
	.prepare('get_user_with_relations');

export async function getDetailedUserById(
	userId: number
): Promise<DetailedUser> {
	const user = await preparedUser.execute({ id: userId });
	if (!user) throw new Error(`No such user (id: ${userId})`);

	return user;
}

export async function getAllSubscriptions() {
	const subscriptions = await db.query.subscriptions.findMany({
		with: {
			user: true,
			vehicle: true,
			purchases: { orderBy: [desc(purchases.updatedAt)] },
			washes: { orderBy: [desc(washes.updatedAt)] },
		},
	});
	return subscriptions;
}