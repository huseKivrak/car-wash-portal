'use server';

import { db } from '@/database';
import {
	subscriptions,
	insertSubscriptionSchema,
	vehicles,
} from '@/database/schema';
import { eq } from 'drizzle-orm';
import { z, ZodError } from 'zod';
import { makeVehicleTitle } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

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

export async function deleteSubscription(formData: FormData) {
	try {
		const idString = formData.get('subscription_id') as string;
		if (!idString) throw new Error('Subscription id required.');
		const subscriptionId = parseInt(idString);
		const currentDate = new Date();

		await db
			.update(subscriptions)
			.set({
				isCancelled: true,
				cancelledAt: currentDate,
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
	const rows = await db
		.select()
		.from(vehicles)
		.where(eq(vehicles.id, vehicleId));
	const vehicle = rows[0];

	if (!vehicle)
		return {
			status: 'error',
			message: `Vehicle does not exist. Id: ${vehicleId}`,
		};

	const result = await db
		.update(subscriptions)
		.set({ vehicleId })
		.where(eq(subscriptions.id, subscriptionId))
		.returning();

	const updatedSubscription = result[0];
	const vehicleTitle = makeVehicleTitle(vehicle);

	return {
		status: 'success',
		message: `Subscription ${updatedSubscription.id} updated - ${vehicleTitle}) `,
	};
}
