import { DataTable } from "@/components/table/data-table";
import { subscriptionColumns } from "../../components/table/subscriptionColumns";

import { getAllSubscriptions } from "@/database/queries";

export default async function SubscriptionsPage() {
  const subscriptions = await getAllSubscriptions();
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-primary lg:text-5xl">
        All User Subscriptions
      </h1>
      <DataTable data={subscriptions} columns={subscriptionColumns} />
    </div>
  );
}
