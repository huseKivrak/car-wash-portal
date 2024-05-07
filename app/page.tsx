import { CustomerDashboard } from '@/components/CustomerDashboard';
import { getDetailedUser } from '@/database/queries';

export default async function App() {
	const user = await getDetailedUser(1);
	return (
		<div className='flex flex-col items-center justify-center'>
			<CustomerDashboard user={user} />
		</div>
	);
}
