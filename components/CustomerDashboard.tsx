import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { DetailedUser } from '@/types/types';
import { SubscriptionCard } from './SubscriptionCard';

export async function CustomerDashboard({ user }: { user: DetailedUser }) {
	const subs = user.subscriptions;
	return (
		<div className='flex flex-col border border-zinc-200'>
			<h1>Subscriptions: {subs.length}</h1>
			{subs.map((sub) => (
				<SubscriptionCard subscription={sub} key={sub.id} />
			))}
		</div>
	);
}
