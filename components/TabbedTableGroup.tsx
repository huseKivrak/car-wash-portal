import { DataTable } from './table/data-table';
import { userColumns } from './table/userColumns';
import { subscriptionColumns } from './table/subscriptionColumns';
import { purchaseColumns } from './table/purchaseColumns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DetailedUser } from '@/types/types';
import { dummyData } from '@/dummyData';

export function TabbedTableGroup({
	users = dummyData as unknown as DetailedUser[],
}: {
	users: DetailedUser[];
}) {
	const subscriptions = users.map((user) => user.subscriptions).flat();
	const purchases = users.map((user) => user.purchases).flat();
	return (
		<Tabs
			defaultValue='subscriptions'
			className='w-full border rounded-lg border-primary'
		>
			<TabsList className='grid w-1/3 grid-cols-3 rounded-lg border-primary'>
				<TabsTrigger value='users'>Users</TabsTrigger>
				<TabsTrigger value='subscriptions'>Subscriptions</TabsTrigger>
				<TabsTrigger value='purchases'>Purchases</TabsTrigger>
			</TabsList>
			<TabsContent value='users'>
				<DataTable columns={userColumns} data={users} />
			</TabsContent>
			<TabsContent value='subscriptions'>
				<DataTable columns={subscriptionColumns} data={subscriptions} />
			</TabsContent>
			<TabsContent value='purchases'>
				<DataTable columns={purchaseColumns} data={purchases} />
			</TabsContent>
		</Tabs>
	);
}
