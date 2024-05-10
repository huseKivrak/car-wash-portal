import { getAllDetailedUsers } from '@/database/queries';
import { UsersAutocomplete } from '@/components/UsersAutocomplete';
export default async function App() {
	const users = await getAllDetailedUsers();
	return (
		<div className='flex flex-col items-center justify-center mt-12'>
			<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary'>
				AMP Customer Service Portal
			</h1>
			<UsersAutocomplete users={users} />
		</div>
	);
}
