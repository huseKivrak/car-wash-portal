import { DataTable } from '@/components/ui/data-table';
import { subscriptionColumns } from '../../components/table/subscriptionColumns';
import { subscriptions } from '@/database/schema';
import { db } from '@/database';
import { getAllSubscriptions } from '@/database/queries';

export default async function SubscriptionsPage() {
	const subscriptions = await getAllSubscriptions();
	return (
		<div>
			<h1>Subscriptions</h1>
			<DataTable data={subscriptions} columns={subscriptionColumns} />
		</div>
	);
}
