'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DetailedSubscription, DetailedUser, Vehicle } from '@/types/types';
import {
	MoreHorizontal,
	User,
	LucideEdit,
	UserX,
	LucideCopy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card';

import Link from 'next/link';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { SubscriptionCard } from '@/components/SubscriptionCard';
import { getStatusColor, makeVehicleTitle } from '@/lib/utils';
import { DeleteModal } from '@/components/DeleteModal';
import { cancelUser } from '@/actions/users';
import { useDialog } from '@/components/ui/use-dialog';
import { DataTableColumnHeader } from '@/components/table/DataTableColumnHeader';
import { CopyButton } from '@/components/CopyButton';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { UserForm } from '@/components/forms/UserForm';

export const userColumns: ColumnDef<DetailedUser>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Name' />
		),
		cell: ({ row }) => {
			const user = row.original;
			return (
				<Link href={`users/${user.id}`} className='hover:underline'>
					<div>{user.name}</div>
				</Link>
			);
		},
		filterFn: 'includesString',
	},
	{
		accessorKey: 'email',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Email' />
		),
		cell: ({ row }) => {
			const email = row.original.email;
			return (
				<div className='flex'>
					{email}
					<CopyButton content={email} />
				</div>
			);
		},
		filterFn: 'includesString',
	},
	{
		accessorKey: 'subscriptions',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Subscriptions' />
		),
		cell: ({ row }) => {
			const subscriptions = row.getValue(
				'subscriptions'
			) as DetailedSubscription[];
			return (
				<div className='flex justify-evenly'>
					{subscriptions.map((sub) => (
						<HoverCard key={sub.createdAt.toString()}>
							<HoverCardTrigger>
								<Badge
									variant='outline'
									className='w-6 h-6 rounded-full'
									style={{
										backgroundColor: getStatusColor(sub.subscriptionStatus),
									}}
								/>
							</HoverCardTrigger>
							<HoverCardContent asChild>
								<SubscriptionCard subscription={sub} />
							</HoverCardContent>
						</HoverCard>
					))}
				</div>
			);
		},
		filterFn: (row, columnId, filterValue) => {
			const subscriptions: DetailedSubscription[] = row.getValue(columnId);
			return subscriptions.some((subscription) =>
				subscription.subscriptionStatus
					.toLowerCase()
					.includes(filterValue.toLowerCase())
			);
		},
		meta: 'subStatus',
		enableSorting: false,
	},

	{
		id: 'actions',
		cell: ({ row }) => {
			const user = row.original;
			const deleteDialog = useDialog();
			const editDialog = useDialog();

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' className='h-8 w-8 p-0'>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align='end'>
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Link
									href={`users/${user.id}`}
									className='hover:underline flex'
								>
									<User className='mr-1 h-4 w-4' />
									<span>User Details</span>
								</Link>
							</DropdownMenuItem>

							<DropdownMenuItem onSelect={editDialog.trigger}>
								<LucideEdit className='mr-1 h-4 w-4' />
								<span>Edit</span>
							</DropdownMenuItem>

							<DropdownMenuItem onSelect={deleteDialog.trigger}>
								<UserX className='mr-1 h-4 w-4' />
								<span>Delete</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>

					<DeleteModal
						id={user.id}
						deleteAction={cancelUser}
						dialogControl={deleteDialog}
					/>

					<Dialog {...editDialog.props}>
						<DialogContent>
							<UserForm user={user} onSuccess={editDialog.dismiss} />
						</DialogContent>
					</Dialog>
				</DropdownMenu>
			);
		},
	},
];
