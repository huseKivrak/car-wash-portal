import { DetailedSubscription } from '@/types/types';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from './ui/badge';
import { getStatusColor, makeVehicleTitle } from '@/lib/utils';
export function SubscriptionCard({
	subscription,
}: {
	subscription: DetailedSubscription;
}) {
	const { subscriptionStatus, startDate, endDate } = subscription;
	const { licensePlate } = subscription.vehicle;
	const vehicleTitle = makeVehicleTitle(subscription.vehicle);

	const color = getStatusColor(subscriptionStatus);
	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 space-x-2 pb-2'>
				<CardTitle>
					<div>{vehicleTitle}</div>
				</CardTitle>
				<Badge variant='outline' style={{ backgroundColor: color }}>
					<div className='text-muted-foreground'>
						{subscriptionStatus.toUpperCase()}
					</div>
				</Badge>
			</CardHeader>
			<CardContent className='w-80 text-sm text-muted-foreground'>
				<div>Plate: {licensePlate}</div>
				<div className='font-bold'>
					Remaining Washes: {subscription.remainingWashes}
				</div>
				<div className=''>Started: {startDate.toLocaleDateString()}</div>
				<div className='font-semibold'>
					Expires: {endDate?.toLocaleDateString()}
				</div>
			</CardContent>
		</Card>
	);
}
