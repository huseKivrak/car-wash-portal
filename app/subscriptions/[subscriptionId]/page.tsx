import { db } from '@/database';
import { subscriptions } from '@/database/schema';

export default async function SubscriptionDetailPage({
	params,
}: {
	params: { subscriptionId: string };
}) {
	const { subscriptionId } = params;

	return (
		<div>
			<h1>Subscription Detail</h1>
		</div>
	);
}
