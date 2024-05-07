import {
	pgTable,
	serial,
	text,
	timestamp,
	integer,
	boolean,
	uniqueIndex,
	index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';

export const users = pgTable(
	'users',
	{
		id: serial('id').primaryKey(),
		name: text('name').notNull(),
		phone: text('phone'),
		email: text('email').notNull().unique(),
		role: text('role').notNull().default('user'),
		isStaff: boolean('is_staff').default(false),
		isCancelled: boolean('is_cancelled').notNull().default(false),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at'),
		cancelledAt: timestamp('cancelled_at'),
	},
	(table) => {
		return {
			nameIdx: index('name_idx').on(table.name),
			emailIdx: uniqueIndex('email_idx').on(table.email),
		};
	}
);

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
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
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

export const selectWashSchema = createSelectSchema(washes);
export const insertWashSchema = createInsertSchema(washes);

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
	updatedAt: timestamp('updated_at'),

	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	washId: integer('wash_id').references(() => washes.id),
	subscriptionId: integer('subscription_id').references(() => subscriptions.id),
});

export const selectPurchaseSchema = createSelectSchema(purchases);
export const insertPurchaseSchema = createInsertSchema(purchases);

//Relations
export const userRelations = relations(users, ({ many }) => ({
	subscriptions: many(subscriptions),
	vehicles: many(vehicles),
	washes: many(washes),
	purchases: many(purchases),
}));

export const vehicleRelations = relations(vehicles, ({ one }) => ({
	owner: one(users, { fields: [vehicles.userId], references: [users.id] }),
}));

export const subscriptionRelations = relations(
	subscriptions,
	({ one, many }) => ({
		user: one(users, {
			fields: [subscriptions.userId],
			references: [users.id],
		}),
		vehicle: one(vehicles, {
			fields: [subscriptions.vehicleId],
			references: [vehicles.id],
		}),
		washes: many(washes),
		purchases: many(purchases),
	})
);

export const washRelations = relations(washes, ({ one }) => ({
	user: one(users, {
		fields: [washes.userId],
		references: [users.id],
	}),
	subscriptions: one(subscriptions, {
		fields: [washes.subscriptionId],
		references: [subscriptions.id],
	}),
}));

export const purchaseRelations = relations(purchases, ({ one }) => ({
	user: one(users, {
		fields: [purchases.userId],
		references: [users.id],
	}),
	wash: one(washes, {
		fields: [purchases.washId],
		references: [washes.id],
	}),
	subscription: one(subscriptions, {
		fields: [purchases.subscriptionId],
		references: [subscriptions.id],
	}),
}));