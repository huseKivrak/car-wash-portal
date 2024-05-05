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

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card';

import Link from 'next/link';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

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
		header: () => <div>SUBSCRIPTION STATUS</div>,
		cell: ({ row }) => {
			const subscriptions = row.getValue('subscriptions') as Subscription[];
			const subscription = subscriptions[0];
			const vehicle = row.original.vehicles[0];
			const { licensePlate, make, model, year, color } = vehicle;
			const { status, type, startDate, endDate } = subscription;
			return (
				<div className='flex justify-center space-x-2'>
					<HoverCard>
						<HoverCardTrigger>
							<Badge
								variant='outline'
								className={`w-1 h-1 p-2' ${
									status === 'active'
										? 'bg-green-600'
										: status === 'overdue'
										? 'bg-orange-600'
										: ''
								}`}
							/>
							<HoverCardContent className='flex justify-between space-x-2'>
								<div className='space-y-1'>
									<h4
										className={`w-1 h-1 p-2' ${
											status === 'active'
												? 'bg-green-600'
												: status === 'overdue'
												? 'bg-orange-600'
												: ''
										}`}
									>
										{status.toUpperCase()}
									</h4>
									<div className='flex flex-col'>
										<span className='text-sm '>{`${year} ${make} ${model}`}</span>
										<span></span>
										<span className='text-xs'>Plate: {licensePlate}</span>
									</div>

									<div className='flex flex-col text-xs items-start pt-2'>
										<span className='text-muted-foreground'>
											Started: {startDate.toLocaleDateString()}
										</span>
										<span className='font-semibold'>
											Expires: {endDate?.toLocaleDateString()}
										</span>
									</div>
								</div>
							</HoverCardContent>
						</HoverCardTrigger>
					</HoverCard>
				</div>
			);
		},
	},
	// {
	// 	id: 'washes',
	// 	header: 'WASHES LEFT (TOTAL)',
	// 	cell: ({ row }) => {
	// 		const subscriptions = row.getValue('subscriptions') as Subscription[];
	// 		const { remainingWashes, totalWashes } = subscriptions[0];
	// 		return <div>{`${remainingWashes} ( ${totalWashes} )`}</div>;
	// 	},
	// },
	// {
	// 	id: 'subscriptionEndDate',
	// 	header: 'EXPIRES',
	// 	cell: ({ row }) => {
	// 		const subscriptions = row.getValue('subscriptions') as Subscription[];
	// 		const endDate = subscriptions[0].endDate;
	// 		const formatted = endDate?.toLocaleDateString('en-us', {
	// 			year: '2-digit',
	// 			month: '2-digit',
	// 			day: '2-digit',
	// 		});
	// 		return <div>{formatted}</div>;
	// 	},
	// },
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
