'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DetailedSubscription, DetailedUser } from '@/types/types';
import {
	MoreHorizontal,
	User,
	LucideEdit,
	UserX,
	AppWindow,
	LucideCopy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card';

import Link from 'next/link';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { SubscriptionCard } from '@/components/SubscriptionCard';
import { getStatusColor } from '@/lib/utils';
import { DeleteModal } from '@/components/DeleteModal';
import { deleteUser } from '@/actions/users';
import { useDialog } from '@/components/ui/use-dialog';

export const userColumns: ColumnDef<DetailedUser>[] = [
	{
		accessorKey: 'fullName',
		header: () => <div>NAME</div>,
		cell: ({ row }) => {
			const user = row.original;
			return (
				<Link href={`users/${user.id}`} className='hover:underline'>
					<div>{user.fullName}</div>
				</Link>
			);
		},
	},
	{
		accessorKey: 'email',
		header: 'EMAIL',
		cell: ({ row }) => {
			return (
				<div className='flex'>
					{row.getValue('email')}
					<LucideCopy className='ml-1 w-4 h-4' />
				</div>
			);
		},
	},
	{
		accessorKey: 'subscriptions',
		header: () => (
			<div className='flex justify-center'>SUBSCRIPTION STATUS</div>
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
						<DropdownMenuLabel>User Actions</DropdownMenuLabel>
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
						action={deleteUser}
						dialogControl={deleteDialog}
					/>
				</DropdownMenu>
			);
		},
	},
];
