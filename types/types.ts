import { z } from 'zod';
import {
	selectUserSchema,
	insertUserSchema,
	selectVehicleSchema,
	insertVehicleSchema,
	selectSubscriptionSchema,
	insertSubscriptionSchema,
	selectWashSchema,
	insertWashSchema,
	selectPurchaseSchema,
	insertPurchaseSchema,
} from '@/database/schema';

export type User = z.infer<typeof selectUserSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;

export type Vehicle = z.infer<typeof selectVehicleSchema>;
export type NewVehicle = z.infer<typeof insertVehicleSchema>;

export type NewSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = z.infer<typeof selectSubscriptionSchema>;

export type Wash = z.infer<typeof selectWashSchema>;
export type NewWash = z.infer<typeof insertWashSchema>;

export type Purchase = z.infer<typeof selectPurchaseSchema>;
export type NewPurchase = z.infer<typeof insertPurchaseSchema>;

export interface DetailedSubscription extends Subscription {
	vehicle: Vehicle;
	user: User;
}

export interface DetailedUser extends User {
	subscriptions: DetailedSubscription[];
}

export type NavLink = {
	label: string;
	href: string;
};
