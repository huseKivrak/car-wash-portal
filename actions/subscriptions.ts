'use server';

import { db } from '@/database';
import { subscriptions, insertSubscriptionSchema } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { z, ZodError } from 'zod';

import { revalidatePath } from 'next/cache';
import { NewSubscription } from '@/types/types';

/**
 *
 * @param formInputs
 * @returns
 */
type SubscriptionFields = z.infer<typeof insertSubscriptionSchema>;
export async function addSubscription(formInputs: SubscriptionFields) {
	try {
		const values = insertSubscriptionSchema.parse(formInputs);

		const result = await db.insert(subscriptions).values(values).returning();
		const subscription = result[0];
		return {
			status: 'success',
			message: `Subscription ${subscription.id} created`,
		};
	} catch (error) {
		if (error instanceof ZodError) {
			console.error('Zod issues:', error.issues);
			return {
				status: 'validation error',
				errors: error.issues.map((issue) => ({
					path: issue.path,
					message: issue.message,
				})),
			};
		} else {
			return {
				status: 'server error',
				message: `An error occured while adding subscription: ${error}`,
			};
		}
	}
}

export async function cancelSubscription(subscriptionId: number) {
	try {
		const currentDate = new Date();

		await db
			.update(subscriptions)
			.set({
				isCancelled: true,
				cancelledAt: currentDate,
				updatedAt: currentDate,
				subscriptionStatus: 'cancelled',
			})
			.where(eq(subscriptions.id, subscriptionId));
		console.log('Subscription cancelled.');
	} catch (error) {
		return {
			status: 'server error',
			message: `An error occured while cancelling subscription: ${error}`,
		};
	}

	revalidatePath('/', 'layout');
}

/**
 *
 * @param subscriptionId
 * @param vehicleId
 * @returns
 */
export async function transferSubscription(
	subscriptionId: number,
	vehicleId: number
) {
	//get old subscription to clone into new
	const currentSubscription = await db.query.subscriptions.findFirst({
		where: eq(subscriptions.id, subscriptionId),
	});
	if (!currentSubscription) {
		return { status: 'error', message: 'Original subscription not found.' };
	} else if (currentSubscription.vehicleId === vehicleId) {
		return {
			status: 'error',
			message: 'Subscription is already for this vehicle.',
		};
	}

	//cancel old subscription:
	await cancelSubscription(subscriptionId);

	const currentDate = new Date();
	//create new subscription entry with new vehicle Id
	const newSubscriptionData: NewSubscription = {
		...currentSubscription,
		vehicleId,
		isCancelled: false,
		cancelledAt: null,
		updatedAt: currentDate,
		subscriptionStatus: 'active',
	};

	const newSubscriptionResult = await db
		.insert(subscriptions)
		.values(newSubscriptionData)
		.returning();
	const newSubscription = newSubscriptionResult[0];
	revalidatePath('/');

	return {
		status: 'success',
		message: `Subscription transfered to Vehicle #${vehicleId}. New Id: ${newSubscription.id}.`,
	};
}
