import {
	pgTable,
	serial,
	text,
	timestamp,
	integer,
	boolean,
	pgEnum,
	pgView,
} from 'drizzle-orm/pg-core';
import { eq, isNull } from 'drizzle-orm';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';

const roleEnum = pgEnum('role', ['admin', 'csr', 'dev', 'user']);
const subscriptionTypeEnum = pgEnum('subscription_type', ['basic', 'premium']);
const statusEnum = pgEnum('status', ['active', 'cancelled', 'overdue']);
const itemTypeEnum = pgEnum('item_type', ['subscription', 'wash']);

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	fullName: text('full_name'),
	phone: text('phone'),
	email: text('email').notNull().unique(),
	role: roleEnum('role').notNull().default('user'),
	isStaff: boolean('is_staff').default(false),
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
	interval: text('interval', { enum: ['monthly', 'annual'] }).default(
		'monthly'
	),
	subscriptionType: subscriptionTypeEnum('subscription_type')
		.notNull()
		.default('basic'),
	status: statusEnum('status').notNull().default('active'),
	startDate: timestamp('start_date').notNull().defaultNow(),
	endDate: timestamp('end_date'),
	totalWashes: integer('total_washes').notNull().default(10),
	remainingWashes: integer('remaining_washes').notNull().default(10),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at'),
	cancelledAt: timestamp('cancelled_at'),
	vehicleId: integer('vehicle_id')
		.notNull()
		.references(() => vehicles.id),
});

export const overdueSubscriptionsView = pgView('overdue_subscriptions_view').as(
	(qb) =>
		qb.select().from(subscriptions).where(eq(subscriptions.status, 'overdue'))
);

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

export const singleWashesView = pgView('single_washes_view').as((qb) =>
	qb.select().from(washes).where(isNull(washes.subscriptionId))
);

export const purchases = pgTable('purchases', {
	id: serial('id').primaryKey(),
	itemType: itemTypeEnum('item_type').notNull().default('subscription'),
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

export const washPurchasesView = pgView('wash_purchases_view').as((qb) =>
	qb.select().from(purchases).where(eq(purchases.itemType, 'wash'))
);

export const subscriptionPurchasesView = pgView(
	'subscription_purchases_view'
).as((qb) =>
	qb.select().from(purchases).where(eq(purchases.itemType, 'subscription'))
);

export const selectPurchaseSchema = createSelectSchema(purchases);
export const insertPurchaseSchema = createInsertSchema(purchases);
