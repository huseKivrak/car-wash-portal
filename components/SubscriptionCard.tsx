"use client";

import { useState } from "react";
import { DetailedSubscription } from "@/types/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { formatDateTime, getStatusColor, makeVehicleTitle } from "@/lib/utils";
import { Separator } from "./ui/separator";
export function SubscriptionCard({
  subscription,
}: {
  subscription: DetailedSubscription;
}) {
  const { subscriptionStatus, startDate, endDate, vehicle, washes, purchases } =
    subscription;
  const vehicleTitle = makeVehicleTitle(vehicle);
  const color = getStatusColor(subscriptionStatus);

  return (
    <Card className="w-[350px]">
      <CardHeader className="flex space-y-1 pb-1">
        <CardTitle className="flex justify-between">
          <div className="text-sm">{vehicleTitle}</div>
          <Badge variant="outline" style={{ backgroundColor: color }}>
            <div className="text-foreground">
              {subscriptionStatus.toUpperCase()}
            </div>
          </Badge>
        </CardTitle>
        <div className="text-sm text-stone-500 dark:text-stone-400">
          <p className="font-bold">
            Washes Left: {subscription.remainingWashes}
          </p>
          <div className="flex items-center">
            <p className="font-medium">Last Wash:</p>
            <p className="ml-2 text-sm font-medium">
              {formatDateTime(washes[0]?.createdAt)}
            </p>
          </div>
          <p>Expires: {endDate ? formatDateTime(endDate, false) : "n/a"}</p>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col text-sm">
        <div>
          <h4>All washes:</h4>
          <ul className="list-inside list-disc text-green-700 ">
            {washes.map((w) => (
              <li key={w.id} className="px-2 py-0 font-mono text-xs">
                {formatDateTime(w.createdAt)}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
