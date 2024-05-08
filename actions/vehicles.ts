'use server';

import { insertVehicleSchema, vehicles } from '@/database/schema';
import { db } from '@/database';
import { z, ZodError } from 'zod';
import { makeVehicleTitle } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

type VehicleInputs = z.infer<typeof insertVehicleSchema>;
export async function addVehicle(formInputs: VehicleInputs) {
	let vehicleTitle;
	try {
		const values = insertVehicleSchema.parse(formInputs);

		const result = await db.insert(vehicles).values(values).returning();
		vehicleTitle = makeVehicleTitle(result[0]);
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
				message: `An error occured while adding vehicle: ${error}`,
			};
		}
	}

	revalidatePath('/');
	return {
		status: 'success',
		message: `${vehicleTitle} created.`,
	};
}
