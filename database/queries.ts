import { DetailedUser } from '@/types/types';
import { db } from '.';
import { subscriptions, purchases } from './schema';
import { asc, sql } from 'drizzle-orm';

const preparedAllUsers = db.query.users
	.findMany({
		with: {
			subscriptions: {
				orderBy: [asc(subscriptions.startDate)],
				with: {
					vehicle: true,
					washes: true,
					purchases: true,
				},
			},
			vehicles: true,
			washes: true,
			purchases: { orderBy: [asc(purchases.createdAt)] },
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
					vehicle: true,
					washes: true,
					purchases: true,
				},
			},
			vehicles: true,
			washes: true,
			purchases: { orderBy: [asc(purchases.createdAt)] },
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
