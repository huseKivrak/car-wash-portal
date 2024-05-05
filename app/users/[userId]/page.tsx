import { getAllDetailedUsers, getDetailedUser } from '@/database/queries';

export async function generateStaticParams() {
	const users = await getAllDetailedUsers();

	return users.map((user) => ({
		userId: user.id.toString(),
	}));
}

export default async function UserDetailPage({
	params,
}: {
	params: { userId: string };
}) {
	const { userId } = params;

	const user = await getDetailedUser(parseInt(userId));
	return (
		<div className='flex flex-col items-center'>
			<h1>{user.fullName}</h1>
		</div>
	);
}
