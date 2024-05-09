'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { DetailedUser } from '@/types/types';
import { SubscriptionCard } from './SubscriptionCard';
import { AddVehicleForm } from './forms/AddVehicleForm';

export function CustomerDashboard({ user }: { user: DetailedUser }) {
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
				{user.subscriptions.map((sub) => (
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


