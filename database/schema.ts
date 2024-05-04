import {
	pgTable,
	serial,
	text,
	timestamp,
	integer,
	boolean,
} from 'drizzle-orm/pg-core';
import {createSelectSchema, createInsertSchema} from 'drizzle-zod';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	fullName: text('full_name'),
	phone: text('phone'),
	email: text('email').notNull().unique(),
	role: text('role', {enum: ['admin', 'csr', 'dev', 'user']})
		.notNull()
		.default('user'),
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
	type: text('type', {enum: ['basic', 'premium']}),
	interval: text('interval', {enum: ['monthly', 'annual']}).default('monthly'),
	status: text('status', {
		enum: ['active', 'cancelled', 'overdue'],
	}),
	startDate: timestamp('start_date').notNull(),
	endDate: timestamp('end_date'),
	totalWashes: integer('total_washes').notNull().default(4),
	remainingWashing: integer('remaining_washes').notNull().default(4),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at'),
	cancelledAt: timestamp('cancelled_at'),
	vehicleId: integer('vehicle_id')
		.notNull()
		.references(() => vehicles.id),
});

export const selectSubscriptionSchema = createSelectSchema(subscriptions);
export const insertSubscriptionSchema = createInsertSchema(subscriptions);

export const washes = pgTable('washes', {
	id: serial('id').primaryKey(),
	price: integer('price').notNull(),
	createdAt: timestamp('washed_on').notNull().defaultNow(),
	vehicleId: integer('vehicle_id')
		.notNull()
		.references(() => vehicles.id),
});

//todo: db view for user washes

export const payments = pgTable('payments', {
	id: serial('id').primaryKey(),
	amount: integer('amount').notNull(),
	createdAt: timestamp('created_on').notNull().defaultNow(),

	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
});

export const purchases = pgTable('purchases', {
	id: serial('id').primaryKey(),
	price: integer('price').notNull(),
	discount: integer('discount'),
	finalPrice: integer('final_price').notNull(),
	itemId: integer('item_id').notNull(),
	itemType: text('item_type', {enum: ['subscription', 'wash']}).notNull(),
	paidOn: timestamp('paid_on'),
	createdAt: timestamp('created_on').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull(),

	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	paymentId: integer('payment_id').references(() => payments.id),
});
