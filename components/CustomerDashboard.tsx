"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { DetailedUser } from "@/types/types";
import { SubscriptionCard } from "./SubscriptionCard";
import { UserOverview } from "./UserOverview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./table/data-table";
import { subscriptionColumns } from "./table/subscriptionColumns";
import { purchaseColumns } from "./table/purchaseColumns";
import { Separator } from "./ui/separator";

export function CustomerDashboard({ user }: { user: DetailedUser }) {
  return (
    <div className="flex w-full flex-row space-x-16">
      <div className="">
        <UserOverview user={user} />
      </div>
      <div className="w-full rounded-2xl border-2 p-8">
        <Tabs
          defaultValue="subscriptions"
          className="w-full rounded-lg border-primary"
        >
          <TabsList className="grid w-full grid-cols-2 rounded-lg border border-primary">
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
          </TabsList>
          <TabsContent value="subscriptions">
            <DataTable
              columns={subscriptionColumns}
              data={user.subscriptions}
            />
          </TabsContent>
          <TabsContent value="purchases">
            <DataTable columns={purchaseColumns} data={user.purchases} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
