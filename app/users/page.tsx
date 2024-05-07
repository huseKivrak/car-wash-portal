import { userColumns } from '@/app/users/userColumns';
import { DataTable } from '@/components/ui/data-table';
import { getAllDetailedUsers } from '@/database/queries';

export default async function UsersListPage() {
	const users = await getAllDetailedUsers();

	return (
		<div className='container mx-auto py-10'>
			<DataTable columns={userColumns} data={users} dataType='user' />
		</div>
	);
}
