'use client';
import { useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import {
	User,
	DetailedSubscription,
	Vehicle,
	Wash,
	Purchase,
} from '@/types/types';
import { SubscriptionCard } from './SubscriptionCard';
import { AddVehicleForm } from './forms/AddVehicleForm';

export function CustomerDashboard({
	user,
	detailedSubscriptions,
	vehicles,
	washes,
	purchases,
}: {
	user: User;
	detailedSubscriptions: DetailedSubscription[];
	vehicles: Vehicle[];
	washes: Wash[];
	purchases: Purchase[];
}) {
	const [showVehicleForm, setShowVehicleForm] = useState(false);
	const handleVehicleFormSuccess = () => {
		setShowVehicleForm(false);
	};

	return (
		<div className='space-y-4'>
			<h1 className='text-5xl'>{user.name}</h1>

			<div>
				<h2 className='text-4xl'>Recent Purchases</h2>
			</div>
			<div className='flex flex-col'>
				<h2>Subscriptions</h2>
				{detailedSubscriptions.map((sub) => (
					<SubscriptionCard subscription={sub} />
				))}
			</div>
			<div className=''>
				<h2>Vehicles</h2>
				<Button onClick={() => setShowVehicleForm(!showVehicleForm)}>
					{showVehicleForm ? 'Cancel' : 'Add vehicle'}
				</Button>
				{showVehicleForm && (
					<AddVehicleForm
						userId={user.id}
						onSuccess={handleVehicleFormSuccess}
					/>
				)}
			</div>
		</div>
	);
}
