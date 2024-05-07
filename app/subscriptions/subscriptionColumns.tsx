'use client';
import Link from 'next/link';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card';
import { DetailedSubscription } from '@/types/types';
import { getStatusColor, makeVehicleTitle } from '@/lib/utils';
import { SubscriptionCard } from '@/components/SubscriptionCard';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, User, LucideEdit, FolderX } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { useDialog } from '@/components/ui/use-dialog';
import { ColumnDef } from '@tanstack/react-table';

import { DeleteModal } from '@/components/DeleteModal';
import { deleteSubscription } from '@/actions/subscriptions';

export const subscriptionColumns: ColumnDef<DetailedSubscription>[] = [
	{
		accessorKey: 'vehicle',
		header: 'VEHICLE',
		cell: ({ row }) => {
			const vehicle = row.original.vehicle;
			const vehicleTitle = makeVehicleTitle(vehicle);
			return <div>{vehicleTitle}</div>;
		},
	},
	{
		accessorKey: 'user',
		header: 'USER',
		cell: ({ row }) => {
			const user = row.original.user;
			return (
				<div className='hover:underline'>
					<Link href={`/users/${user.id}`}>{user.fullName}</Link>
				</div>
			);
		},
	},
	{
		accessorKey: 'status',
		header: 'STATUS',
		cell: ({ row }) => {
			const { subscriptionStatus } = row.original;
			const statusColor = getStatusColor(subscriptionStatus);
			return (
				<div className=''>
					<HoverCard>
						<HoverCardTrigger>
							<Badge
								variant='outline'
								className={'w-1 h-1 p-2'}
								style={{ backgroundColor: statusColor }}
							/>
							<HoverCardContent
								className='flex justify-between space-x-2'
								asChild
							>
								<SubscriptionCard subscription={row.original} />
							</HoverCardContent>
						</HoverCardTrigger>
					</HoverCard>
				</div>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const sub = row.original;
			const deleteDialog = useDialog();
			const detailsDialog = useDialog();
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
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuGroup>
							<DropdownMenuItem onSelect={detailsDialog.trigger}>
								<User className='mr-1 h-4 w-4' />
								<span>Details</span>
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={editDialog.trigger}>
								<LucideEdit className='mr-1 h-4 w-4' />
								<span>Edit</span>
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={deleteDialog.trigger}>
								<FolderX className='mr-1 h-4 w-4' />
								<span>Delete</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>

					<Dialog {...detailsDialog.props}>
						<DialogContent>
							Subscription Details Here
							<DialogClose asChild>
								<Button>Close</Button>
							</DialogClose>
						</DialogContent>
					</Dialog>

					<Dialog {...editDialog.props}>
						<DialogContent>
							Edit Subscription Form Here
							<DialogClose asChild>
								<Button>Close</Button>
							</DialogClose>
						</DialogContent>
					</Dialog>
					<DeleteModal
						id={sub.id}
						action={deleteSubscription}
						dialogControl={deleteDialog}
					/>
				</DropdownMenu>
			);
		},
	},
];
