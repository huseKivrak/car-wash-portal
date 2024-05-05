'use server';

import { db } from '@/database';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { z, ZodError } from 'zod';
import { insertUserSchema } from '@/database/schema';

type InsertUser = z.infer<typeof insertUserSchema>;
export async function updateUser({
	fieldsToUpdate,
}: {
	fieldsToUpdate: InsertUser;
}) {
	const { id, fullName, phone, email } = insertUserSchema.parse(fieldsToUpdate);
	try {
		const updatedRows = await db
			.update(users)
			.set({ fullName, phone, email })
			.where(eq(users.id, id!))
			.returning();

		const updatedUser = updatedRows[0];
		return {
			status: 'success',
			message: `${updatedUser.fullName} has been updated.`,
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
				message: `An error occured while updating: ${error}`,
			};
		}
	}
}

export async function deleteUser(userId: number) {
	try {
		const deletedRows = await db
			.delete(users) // todo: .update(users).set({ cancelledAt: new Date() })
			.where(eq(users.id, userId))
			.returning({ name: users.fullName });

		const deletedUser = deletedRows[0];

		return {
			status: 'success',
			message: `${deletedUser.name} has been deleted`,
		};
	} catch (error) {
		console.error(error);
		return {
			status: 'error',
			message: `An error occured during deletion: ${error} `,
		};
	}
}
