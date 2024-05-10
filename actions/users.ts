'use server';

import { db } from '@/database';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { z, ZodError } from 'zod';
import { insertUserSchema } from '@/database/schema';
import { revalidatePath } from 'next/cache';
import { User } from '@/types/types';

type InsertUser = z.infer<typeof insertUserSchema>;
export async function updateUser(fieldsToUpdate: InsertUser) {
	const { id, name, phone, email } = insertUserSchema.parse(fieldsToUpdate);

	let updatedUser;
	try {
		const updatedRows = await db
			.update(users)
			.set({ name, phone, email })
			.where(eq(users.id, id!))
			.returning();

		updatedUser = updatedRows[0];
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
				message: `An error occured while updating: ${error}`,
			};
		}
	}
	revalidatePath('/', 'layout');
	return {
		status: 'success',
		message: `${updatedUser.name} has been updated.`,
	};
}

export async function cancelUser(userId: number) {
	let cancelledUser;

	try {
		const currentDate = new Date();

		const result = await db
			.update(users)
			.set({
				cancelledAt: currentDate,
				isCancelled: true,
				updatedAt: currentDate,
			})
			.where(eq(users.id, userId))
			.returning();
		cancelledUser = result[0];
		console.log('User account cancelled.');
	} catch (error) {
		console.error(error);
		return {
			status: 'error',
			message: `An error occured while cancelling user: ${error} `,
		};
	}

	revalidatePath('/', 'layout');
	return {
		status: 'success',
		message: `${cancelledUser.name}'s account has been cancelled.`,
	};
}
