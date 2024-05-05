'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DetailedUser } from '@/types/types';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from './button';

export const userColumns: ColumnDef<DetailedUser>[] = [
	{
		accessorKey: 'fullName',
		header: () => <div className='text-left'>Name</div>,
	},
	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Email
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: 'createdAt',
		header: 'Created On',
	},
];
