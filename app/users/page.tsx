import { userColumns } from '../../components/table/userColumns';
import { DataTable } from '@/components/table/data-table';
import { getAllDetailedUsers } from '@/database/queries';

export default async function UsersListPage() {
	const users = await getAllDetailedUsers();

	return (
		<div className='container mx-auto py-5'>
			<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary'>
				All Users
			</h1>
			<DataTable columns={userColumns} data={users} />
		</div>
	);
}
