'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DetailedUser, Subscription, Vehicle } from '@/types/types';
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

import Link from 'next/link';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
			const email = row.original.email;
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
		header: 'SUBSCRIPTION',
		cell: ({ row }) => {
			const subscriptions = row.getValue('subscriptions') as Subscription[];
			const subscription = subscriptions[0];
			const vehicle = row.original.vehicles[0];
			const { licensePlate, make, model, year, color } = vehicle;
			const subType = subscription.type;
			return (
				<div className='flex justify-center space-x-2 max-w-sm'>
					<p className='tracking-tighter text-sm '>
						{`${year} ${make} ${model}`}
					</p>
					<Badge
						variant='outline'
						className={cn(
							'p-2 text-white ',
							subscription.status === 'active'
								? 'bg-green-600'
								: subscription.status === 'overdue'
								? 'bg-orange-600'
								: ''
						)}
					>
						{subType.toUpperCase()}
					</Badge>
				</div>
			);
		},
	},
	{
		id: 'washes',
		header: 'WASHES LEFT (TOTAL)',
		cell: ({ row }) => {
			const subscriptions = row.getValue('subscriptions') as Subscription[];
			const { remainingWashes, totalWashes } = subscriptions[0];
			return <div>{`${remainingWashes} ( ${totalWashes} )`}</div>;
		},
	},
	{
		id: 'subscriptionEndDate',
		header: 'EXPIRES',
		cell: ({ row }) => {
			const subscriptions = row.getValue('subscriptions') as Subscription[];
			const endDate = subscriptions[0].endDate;
			const formatted = endDate?.toLocaleDateString('en-us', {
				year: '2-digit',
				month: '2-digit',
				day: '2-digit',
			});
			return <div>{formatted}</div>;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const user = row.original;

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

						<DropdownMenuSeparator />

						<DropdownMenuGroup>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>
									<User className='mr-2 h-4 w-4' />
									<span>User</span>
								</DropdownMenuSubTrigger>
								<DropdownMenuPortal>
									<DropdownMenuSubContent>
										<DropdownMenuItem>
											<Link
												href={`users/${user.id}`}
												className='hover:underline flex'
											>
												<User className='mr-1 h-4 w-4' />
												<span>Details</span>
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<LucideEdit className='mr-1 h-4 w-4' />
											<span>Edit</span>
										</DropdownMenuItem>

										<DropdownMenuItem className='text-red-700'>
											<UserX className='mr-1 h-4 w-4 ' />
											<span>Delete</span>
										</DropdownMenuItem>
									</DropdownMenuSubContent>
								</DropdownMenuPortal>
							</DropdownMenuSub>
							<DropdownMenuItem>
								<Link
									href={`/users/${user.id}/subscriptions`}
									className='hover:underline flex'
								>
									<AppWindow className='mr-1 h-4 w-4' />
									<span>Subscriptions</span>
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
