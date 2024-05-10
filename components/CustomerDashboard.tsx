'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { DetailedUser } from '@/types/types';
import { SubscriptionCard } from './SubscriptionCard';
import { UserOverview } from './UserOverview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from './table/data-table';
import { subscriptionColumns } from './table/subscriptionColumns';
import { purchaseColumns } from './table/purchaseColumns';

export function CustomerDashboard({ user }: { user: DetailedUser }) {
	return (
		<div className='flex flex-row space-x-8'>
			<div className=''>
				<UserOverview user={user} />
			</div>
			<div>
				<Tabs
					defaultValue='subscriptions'
					className='w-full border rounded-lg border-primary'
				>
					<TabsList className='grid w-full grid-cols-2 border rounded-lg border-primary'>
						<TabsTrigger value='subscriptions'>Subscriptions</TabsTrigger>
						<TabsTrigger value='purchases'>Purchases</TabsTrigger>
					</TabsList>
					<TabsContent value='subscriptions'>
						<DataTable
							columns={subscriptionColumns}
							data={user.subscriptions}
						/>
					</TabsContent>
					<TabsContent value='purchases'>
						<DataTable columns={purchaseColumns} data={user.purchases} />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}


