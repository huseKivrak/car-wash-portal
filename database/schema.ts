import {
	pgTable,
	serial,
	text,
	timestamp,
	integer,
	boolean,
	pgView,
	pgEnum,
} from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// const roleEnum = pgEnum('role', ['admin', 'csr', 'dev', 'user', 'cancelled']);
// const subscriptionTypeEnum = pgEnum('subscription_type', ['basic', 'premium']);
// const subscriptionStatus = pgEnum('status', ['active', 'cancelled', 'overdue']);
// const paymentStatus = pgEnum('payment_status', ['paid', 'pending', 'failed']);
// const itemTypeEnum = pgEnum('item_type', ['subscription', 'wash']);

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	fullName: text('full_name'),
	phone: text('phone'),
	email: text('email').notNull().unique(),
	role: text('role').notNull().default('user'),
	isStaff: boolean('is_staff').default(false),
	isCancelled: boolean('is_cancelled').notNull().default(false),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at'),
	cancelledAt: timestamp('cancelled_at'),
});

export const selectUserSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users);

export const vehicles = pgTable('vehicles', {
	id: serial('id').primaryKey(),
	licensePlate: text('license_plate').notNull(),
	make: text('make'),
	model: text('model'),
	year: integer('year'),
	color: text('color'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at'),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
});

export const selectVehicleSchema = createSelectSchema(vehicles);
export const insertVehicleSchema = createInsertSchema(vehicles);

export const subscriptions = pgTable('subscriptions', {
	id: serial('id').primaryKey(),
	interval: text('interval').notNull().default('monthly'),
	subscriptionType: text('subscription_type').notNull().default('basic'),
	subscriptionStatus: text('subscription_status').notNull().default('active'),
	startDate: timestamp('start_date').notNull().defaultNow(),
	endDate: timestamp('end_date'),
	totalWashes: integer('total_washes').notNull().default(10),
	remainingWashes: integer('remaining_washes').notNull().default(10),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at'),
	isCancelled: boolean('is_cancelled').notNull().default(false),
	cancelledAt: timestamp('cancelled_at'),
	vehicleId: integer('vehicle_id')
		.notNull()
		.references(() => vehicles.id),
});

export const selectSubscriptionSchema = createSelectSchema(subscriptions);
export const insertSubscriptionSchema = createInsertSchema(subscriptions);

export const washes = pgTable('washes', {
	id: serial('id').primaryKey(),
	createdAt: timestamp('washed_on').notNull().defaultNow(),
	subscriptionId: integer('subscription_id').references(() => subscriptions.id),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
});

//todo: add check restraint for washId XOR subId
export const purchases = pgTable('purchases', {
	id: serial('id').primaryKey(),
	paymentStatus: text('payment_status').notNull().default('pending'),
	itemType: text('item_type').notNull().default('subscription'),
	price: integer('price').notNull(),
	discount: integer('discount'),
	finalPrice: integer('final_price').notNull(),
	paidOn: timestamp('paid_on'),
	createdAt: timestamp('created_on').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull(),

	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	washId: integer('wash_id').references(() => washes.id),
	subscriptionId: integer('subscription_id').references(() => subscriptions.id),
});

export const selectPurchaseSchema = createSelectSchema(purchases);
export const insertPurchaseSchema = createInsertSchema(purchases);

/** Views
 * Quick access to common datasets:
 * - Active subscriptions
 * - Overdue subscriptions
 * - Cancelled subscriptions
 * - Purchases of washes
 * - Purchases of subscriptions
 */

export const activeSubscriptions = pgView('active_subscriptions_view').as(
	(qb) =>
		qb.select().from(subscriptions).where(eq(subscriptions.isCancelled, false))
);

export const overdueSubscriptionsView = pgView('overdue_subscriptions_view').as(
	(qb) =>
		qb
			.select()
			.from(subscriptions)
			.where(eq(subscriptions.subscriptionStatus, 'overdue'))
);

export const cancelledSubsriptionsView = pgView(
	'cancelled_subscriptions_view'
).as((qb) =>
	qb.select().from(subscriptions).where(eq(subscriptions.isCancelled, true))
);

export const washPurchasesView = pgView('wash_purchases_view').as((qb) =>
	qb.select().from(purchases).where(eq(purchases.itemType, 'wash'))
);

export const subscriptionPurchasesView = pgView(
	'subscription_purchases_view'
).as((qb) =>
	qb.select().from(purchases).where(eq(purchases.itemType, 'subscription'))
);
