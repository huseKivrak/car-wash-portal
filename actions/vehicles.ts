'use server';

import { insertVehicleSchema, vehicles } from '@/database/schema';
import { db } from '@/database';
import { z, ZodError } from 'zod';
import { makeVehicleTitle } from '@/lib/utils';

type VehicleFields = z.infer<typeof insertVehicleSchema>;
export async function addVehicle(formInputs: VehicleFields) {
	try {
		const vehicleValues = insertVehicleSchema.parse(formInputs);
		const result = await db.insert(vehicles).values(vehicleValues).returning();
		const vehicleTitle = makeVehicleTitle(result[0]);
		return {
			status: 'success',
			message: `Vehicle added successfully: ${vehicleTitle}`,
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
				message: `An error occured while adding vehicle: ${error}`,
			};
		}
	}
}
