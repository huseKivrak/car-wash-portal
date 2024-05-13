"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DetailedSubscription, DetailedUser } from "@/types/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { getStatusColor } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { CopyButton } from "@/components/CopyButton";
import { UserActionsMenu } from "./ActionMenus";

export const userColumns: ColumnDef<DetailedUser>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Link href={`users/${user.id}`} className="hover:underline">
          <div>{user.name}</div>
        </Link>
      );
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const email = row.original.email;
      return (
        <div className="flex">
          {email}
          <CopyButton content={email} />
        </div>
      );
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "subscriptions",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Subscriptions (hover)"
        className="tracking-tighter"
      />
    ),
    cell: ({ row }) => {
      const subscriptions = row.getValue(
        "subscriptions",
      ) as DetailedSubscription[];
      return (
        <div className="flex justify-evenly">
          {subscriptions.map((sub) => (
            <HoverCard key={sub.createdAt.toString()}>
              <HoverCardTrigger>
                <Badge
                  variant="outline"
                  className="h-6 w-6 rounded-full"
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
          .includes(filterValue.toLowerCase()),
      );
    },
    meta: "status",
    enableSorting: false,
  },

  {
    id: "actions",
    cell: ({ row }) => <UserActionsMenu user={row.original} />,
  },
];
