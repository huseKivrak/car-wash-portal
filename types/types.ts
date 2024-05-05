import { z } from 'zod';
import {
	selectUserSchema,
	insertUserSchema,
	selectVehicleSchema,
	insertVehicleSchema,
	selectSubscriptionSchema,
	insertSubscriptionSchema,
} from '@/database/schema';

export type User = z.infer<typeof selectUserSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;

export type Vehicle = z.infer<typeof selectVehicleSchema>;
export type NewVehicle = z.infer<typeof insertVehicleSchema>;

export type NewSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = z.infer<typeof selectSubscriptionSchema>;

export interface DetailedUser extends User {
	vehicles: Vehicle[];
	subscriptions: Subscription[];
}

export type NavLink = {
	label: string;
	href: string;
};
