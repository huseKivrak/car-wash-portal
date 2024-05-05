import {getAllDetailedUsers} from '@/database/queries';
export default async function Home() {
	const detailedUsers = await getAllDetailedUsers();

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'></main>
	);
}
