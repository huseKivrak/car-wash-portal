'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { DetailedUser } from '@/types/types';
import { SubscriptionCard } from './SubscriptionCard';
import { AddVehicleForm } from './forms/AddVehicleForm';
import { UserOverview } from './UserOverview';

export function CustomerDashboard({ user }: { user: DetailedUser }) {
	return (
		<div className='flex flex-col space-y-4'>
			<UserOverview user={user} />

			<div className='flex flex-col'>
				{user.subscriptions.map((sub) => (
					<SubscriptionCard subscription={sub} />
				))}
			</div>
			<div className=''></div>
		</div>
	);
}


