import { db } from ".";
import { faker } from "@faker-js/faker";
import { users, vehicles, subscriptions, washes, purchases } from "./schema";
import {
  User,
  NewUser,
  Vehicle,
  NewVehicle,
  Subscription,
  NewSubscription,
  Wash,
  NewWash,
  NewPurchase,
} from "@/types/types";

// Generate fake data
const generateUsers = (count: number): NewUser[] => {
  return Array.from({ length: count }, () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }),
      phone: faker.phone.number(),
      createdAt: faker.date.past(),
    };
  });
};

const generateVehicles = (users: User[]): NewVehicle[] => {
  return users.map((user) => {
    const emoji = faker.internet.emoji();
    return {
      licensePlate: faker.vehicle.vin(),
      make: `${emoji}${faker.vehicle.manufacturer()}`,
      model: `${faker.vehicle.model()}${emoji}`,
      year: faker.date.past().getFullYear(),
      color: faker.vehicle.color(),
      userId: user.id,
    };
  });
};

const generateSubscriptions = (vehicles: Vehicle[]): NewSubscription[] => {
  return vehicles.map((vehicle) => ({
    vehicleId: vehicle.id,
    userId: vehicle.userId,
    subscriptionType: "basic",
    subscriptionStatus: "active",
    interval: "monthly",
    startDate: faker.date.past(),
    endDate: faker.date.future(),
    remainingWashes: faker.number.int({ min: 0, max: 10 }),
  }));
};

// Join table data
const generateSubscriptionWashes = (
  subscriptions: Subscription[],
  vehicles: Vehicle[],
): NewWash[] => {
  return subscriptions.flatMap((sub) => {
    const vehicle = vehicles.find((v) => v.id === sub.vehicleId);
    const usedWashes = sub.totalWashes - sub.remainingWashes;
    return Array.from({ length: usedWashes }, () => ({
      createdAt: faker.date.between({ from: sub.startDate, to: new Date() }),
      subscriptionId: sub.id,
      userId: vehicle?.userId ?? 99,
    }));
  });
};

const generateSingleWashes = (users: User[]): NewWash[] => {
  return users
    .filter((u) => u.id > 75)
    .map((u) => ({
      createdAt: faker.date.between({ from: u.createdAt, to: new Date() }),
      userId: u.id,
    }));
};

const generateSubscriptionPurchases = (
  subscriptions: Subscription[],
  vehicles: Vehicle[],
): NewPurchase[] => {
  return subscriptions.map((sub) => {
    const vehicle = vehicles.find((v) => v.id === sub.vehicleId)!;
    return {
      userId: vehicle.userId,
      subscriptionId: sub.id,
      itemType: "subscription",
      price: sub.subscriptionType === "basic" ? 100 : 1000,
      finalPrice: sub.subscriptionType === "basic" ? 100 : 1000,
      paymentStatus: "paid",
      paidOn: sub.startDate,
    };
  });
};

const generateSingleWashPurchases = (washes: Wash[]): NewPurchase[] => {
  return washes.map((wash) => {
    return {
      userId: wash.userId,
      washId: wash.id,
      itemType: "wash",
      price: 10,
      discount: 0,
      finalPrice: 10,
      createdAt: wash.createdAt,
      paidOn: wash.createdAt,
      paymentStatus: "paid",
    };
  });
};

// Seed
const seedUsers = async (count: number) => {
  const seedUsers = generateUsers(count);
  try {
    const insertedUsers: User[] = await db
      .insert(users)
      .values(seedUsers)
      .returning();
    console.log(`${insertedUsers.length} users created.`);
    return insertedUsers;
  } catch (error) {
    console.error(error);
  }
};

const seedVehicles = async (users: User[]) => {
  const vehicleSeeds = generateVehicles(users);
  try {
    const insertedVehicles = await db
      .insert(vehicles)
      .values(vehicleSeeds)
      .returning();

    console.log(`${insertedVehicles.length} vehicles created.`);
    return insertedVehicles;
  } catch (error) {
    console.error(error);
  }
};

const seedSubscriptions = async (vehicles: Vehicle[]) => {
  const subscriptionSeeds = generateSubscriptions(vehicles);
  try {
    const insertedSubscriptions = await db
      .insert(subscriptions)
      .values(subscriptionSeeds)
      .returning();
    console.log(`${insertedSubscriptions.length} subscriptions created.`);
    return insertedSubscriptions;
  } catch (error) {
    console.error(error);
  }
};

const seedSubscriptionWashes = async (
  subscriptions: Subscription[],
  vehicles: Vehicle[],
) => {
  const subscriptionWashesSeeds = generateSubscriptionWashes(
    subscriptions,
    vehicles,
  );
  try {
    const insertedSubscriptionWashes = await db
      .insert(washes)
      .values(subscriptionWashesSeeds)
      .returning();
    console.log(
      `${insertedSubscriptionWashes.length} subscription washes created.`,
    );
    return insertedSubscriptionWashes;
  } catch (error) {
    console.error(error);
  }
};

const seedSingleWashes = async (users: User[]) => {
  const singleWashSeeds = generateSingleWashes(users);
  try {
    const insertedSingleWashes = await db
      .insert(washes)
      .values(singleWashSeeds)
      .returning();
    console.log(`${insertedSingleWashes.length} single washes created.`);
    return insertedSingleWashes;
  } catch (error) {
    console.error(error);
  }
};

const seedSubscriptionPurchases = async (
  subscriptions: Subscription[],
  vehicles: Vehicle[],
) => {
  const subscriptionPurchasesSeeds = generateSubscriptionPurchases(
    subscriptions,
    vehicles,
  );
  try {
    const insertedSubscriptionPurchases = await db
      .insert(purchases)
      .values(subscriptionPurchasesSeeds)
      .returning();
    console.log(
      `${insertedSubscriptionPurchases.length} subscription purchases created.`,
    );
    return insertedSubscriptionPurchases;
  } catch (error) {
    console.error(error);
  }
};

const seedSingleWashPurchases = async (washes: Wash[]) => {
  const singleWashPurchaseSeeds = generateSingleWashPurchases(washes);
  try {
    const insertedSingleWashPurchases = await db
      .insert(purchases)
      .values(singleWashPurchaseSeeds)
      .returning();
    console.log(
      `${insertedSingleWashPurchases.length} single wash purchases created.`,
    );
    return insertedSingleWashPurchases;
  } catch (error) {
    console.error(error);
  }
};

export const seedDatabase = async (userCount: number) => {
  try {
    const users = await seedUsers(userCount);
    const vehicles = await seedVehicles(users!);
    const subscriptions = await seedSubscriptions(vehicles!);

    await seedSubscriptionWashes(subscriptions!, vehicles!);
    const singleWashes = await seedSingleWashes(users!);
    await seedSubscriptionPurchases(subscriptions!, vehicles!);
    await seedSingleWashPurchases(singleWashes!);

    console.log("Database seeded.");
  } catch (error) {
    console.error(error);
  }
};

seedDatabase(100);
