import {db} from '.';
import {users, vehicles, subscriptions} from './schema';
import {faker} from '@faker-js/faker';
import {
	User,
	NewUser,
	Vehicle,
	NewVehicle,
	Subscription,
	NewSubscription,
} from '../types/types';

const generateUsers = (count: number): NewUser[] => {
	return Array.from({length: count}, () => ({
		fullName: faker.person.fullName(),
		phone: faker.phone.number(),
		role: 'user',
		email: faker.internet.email(),
		createdAt: faker.date.past(),
	}));
};

const generateVehicles = (users: User[]): NewVehicle[] => {
	return users.map((user) => ({
		licensePlate: faker.vehicle.vin(),
		make: faker.vehicle.manufacturer(),
		model: faker.vehicle.model(),
		year: faker.date.past().getFullYear(),
		color: faker.vehicle.color(),
		userId: user.id,
	}));
};

const generateSubscriptions = (vehicles: Vehicle[]): NewSubscription[] => {
	return vehicles.map((vehicle) => ({
		vehicleId: vehicle.id,
		type: 'basic',
		status: 'active',
		interval: 'monthly',
		startDate: faker.date.past(),
		endDate: faker.date.future(),
	}));
};

const seedDatabase = async (seedUsers: NewUser[]) => {
	try {
		const insertedUsers: User[] = await db
			.insert(users)
			.values(seedUsers)
			.returning();
		console.log('Users inserted:', insertedUsers);

		const insertedVehicles: Vehicle[] = await db
			.insert(vehicles)
			.values(generateVehicles(insertedUsers))
			.returning();
		console.log('Vehicles inserted:', insertedVehicles);

		const insertedSubscriptions: Subscription[] = await db
			.insert(subscriptions)
			.values(generateSubscriptions(insertedVehicles))
			.returning();
		console.log('Subscriptions inserted:', insertedSubscriptions);
	} catch (error) {
		console.error(error);
	}
};

const seedUsers = generateUsers(100);
seedDatabase(seedUsers);
