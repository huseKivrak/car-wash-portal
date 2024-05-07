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
		<div className='flex flex-col items-start justify-start'>
			<h1 className='text-5xl'>{user.fullName}</h1>
			<div className='flex flex-col border-2 border-zinc-400'>
				<h2 className='text-2xl'>Subscriptions: {subs.length}</h2>
				{subs.map((sub) => (
					<SubscriptionCard subscription={sub} key={sub.id} />
				))}
			</div>
		</div>
	);
}
