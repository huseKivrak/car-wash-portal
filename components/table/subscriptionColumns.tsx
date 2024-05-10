'use client';
import Link from 'next/link';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card';
import { DetailedSubscription, DetailedUser, Vehicle } from '@/types/types';
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
import { MoreHorizontal, LucideEdit, FolderX } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { useDialog } from '@/components/ui/use-dialog';
import { ColumnDef } from '@tanstack/react-table';

import { DeleteModal } from '@/components/DeleteModal';
import { cancelSubscription } from '@/actions/subscriptions';
import { DataTableColumnHeader } from '@/components/table/DataTableColumnHeader';

export const subscriptionColumns: ColumnDef<DetailedSubscription>[] = [
	{
		accessorKey: 'vehicle',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Vehicle' />
		),
		cell: ({ row }) => {
			const vehicle = row.original.vehicle;
			const vehicleTitle = makeVehicleTitle(vehicle);
			return <div>{vehicleTitle}</div>;
		},
		filterFn: (row, columnId, filterValue) => {
			let vehicles: Vehicle[] = row.getValue(columnId);
			vehicles = Array.isArray(vehicles) ? vehicles : [vehicles];
			return vehicles.some((vehicle) => {
				const title = makeVehicleTitle(vehicle);
				return title.toLowerCase().includes(filterValue.toLowerCase());
			});
		},
	},
	{
		accessorKey: 'user',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='User' />
		),
		cell: ({ row }) => {
			const user = row.original.user;
			return (
				<div className='hover:underline'>
					<Link href={`/users/${user.id}`}>{user.name}</Link>
				</div>
			);
		},
		filterFn: (row, columnId, filterValue) => {
			const user: DetailedUser = row.getValue(columnId);
			return user.name.toLowerCase().includes(filterValue.toLowerCase());
		},
		enableGlobalFilter: true,
	},
	{
		accessorKey: 'subscriptionStatus',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Status' />
		),
		cell: ({ row }) => {
			const { subscriptionStatus } = row.original;
			const statusColor = getStatusColor(subscriptionStatus);
			return (
				<div>
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
		sortingFn: (rowA, rowB, columnId) => {
			const statusOrder = {
				active: 1,
				transferred: 2,
				overdue: 3,
				cancelled: 4,
			};
			const valueA =
				statusOrder[rowA.getValue(columnId) as keyof typeof statusOrder];
			const valueB =
				statusOrder[rowB.getValue(columnId) as keyof typeof statusOrder];
			return valueA - valueB;
		},
		meta: 'subStatus',
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const sub = row.original;
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
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuGroup>
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
						deleteAction={cancelSubscription}
						dialogControl={deleteDialog}
					/>
				</DropdownMenu>
			);
		},
	},
];
