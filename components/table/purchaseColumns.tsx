"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Purchase } from "@/types/types";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
export const purchaseColumns: ColumnDef<Purchase>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
  },
  {
    accessorKey: "itemType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Item Type" />
    ),
    cell: ({ row }) => {
      const { itemType, subscriptionId, washId } = row.original;
      const itemId = subscriptionId || washId;
      return <div className="flex items-center">{itemType.toUpperCase()}</div>;
    },
    filterFn: (row, columnId, filterValue) => {
      const itemType: string = row.getValue(columnId);
      return itemType.toLowerCase().includes(filterValue.toLowerCase());
    },
    meta: "item",
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Status" />
    ),
    cell: ({ row }) => {
      const { paymentStatus } = row.original;
      const statusColor = getStatusColor(paymentStatus);
      return (
        <Badge variant="outline" style={{ backgroundColor: statusColor }}>
          {paymentStatus.toUpperCase()}
        </Badge>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const paymentStatus: string = row.getValue(columnId);
      return paymentStatus.toLowerCase().includes(filterValue.toLowerCase());
    },
    meta: "paymentStatus",
  },
];
