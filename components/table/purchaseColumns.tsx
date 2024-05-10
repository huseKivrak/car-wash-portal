'use client';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Purchase } from '@/types/types';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { getStatusColor } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import { DataTableColumnHeader } from '@/components/table/DataTableColumnHeader';
export const purchaseColumns: ColumnDef<Purchase>[] = [
	{
		accessorKey: 'id',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Id' />
		),
	},
	{
		accessorKey: 'itemType',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Type' />
		),
		cell: ({ row }) => {
			const { itemType, subscriptionId, washId } = row.original;
			const itemId = subscriptionId || washId;
			return (
				<div>
					<Link
						href={`/${itemType}/${itemId}`}
						className={cn(
							badgeVariants({ variant: 'outline' }),
							'p-2 hover:underline bg-stone-500'
						)}
					>
						{itemType.toUpperCase()}
						<ExternalLink className='w-4' />
					</Link>
				</div>
			);
		},
	},
	{
		accessorKey: 'paymentStatus',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Payment Status' />
		),
		cell: ({ row }) => {
			const { paymentStatus, paidOn } = row.original;
			const statusColor = getStatusColor(paymentStatus);
			return (
				<Badge variant='outline' style={{ backgroundColor: statusColor }}>
					{paymentStatus.toUpperCase()}
				</Badge>
			);
		},
	},
];
