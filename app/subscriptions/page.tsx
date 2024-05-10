import { DataTable } from '@/components/table/data-table';
import { subscriptionColumns } from '../../components/table/subscriptionColumns';
import { subscriptions } from '@/database/schema';
import { db } from '@/database';
import { getAllSubscriptions } from '@/database/queries';

export default async function SubscriptionsPage() {
	const subscriptions = await getAllSubscriptions();
	return (
		<div>
			<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary'>
				All User Subscriptions
			</h1>
			<DataTable data={subscriptions} columns={subscriptionColumns} />
		</div>
	);
}
