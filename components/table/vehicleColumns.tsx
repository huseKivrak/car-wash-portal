'use client';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';

import { getStatusColor, makeVehicleTitle } from '@/lib/utils';
import { DataTableColumnHeader } from './DataTableColumnHeader';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card';
import { SubscriptionCard } from '../SubscriptionCard';
import { Badge } from '@/components/ui/badge';
import { Vehicle } from '@/types/types';
export const purchaseColumns: ColumnDef<Vehicle>[] = [
	{
		accessorKey: 'licensePlate',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='LICENSE PLATE' />
		),
	},
	{
		id: 'vehicleTitle',
		accessorFn: (row) => `${makeVehicleTitle(row)}`,
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='NAME' />
		),
		cell: ({ row }) => {},
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='DATE ADDED' />
		),
		sortingFn: 'datetime',
	},
	{
		accessorKey: 'updatedAt',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='LAST UPDATED' />
		),
		sortingFn: 'datetime',
	},
];
