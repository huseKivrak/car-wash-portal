'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
	DetailedSubscription,
	DetailedUser,
	Subscription,
	Vehicle,
} from '@/types/types';
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
		header: () => <div>SUBSCRIPTION STATUS</div>,
		cell: ({ row }) => {
			const subscriptions = row.getValue(
				'subscriptions'
			) as DetailedSubscription[];
			const subscription = subscriptions[0];
			const statusColor = getStatusColor(subscription.subscriptionStatus);
			return (
				<HoverCard>
					<HoverCardTrigger>
						<Badge
							variant='outline'
							className='w-4 h-4 aspect-auto'
							style={{ backgroundColor: statusColor }}
						/>
					</HoverCardTrigger>
					<HoverCardContent>
						<SubscriptionCard subscription={subscription} />;
					</HoverCardContent>
				</HoverCard>
			);
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

										<DropdownMenuItem
											onClick={() =>
												toast({
													title: 'Are you sure you want to delete this user?!',
												})
											}
										>
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
