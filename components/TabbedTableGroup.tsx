import { DataTable } from "./table/data-table";
import { userColumns } from "./table/userColumns";
import { subscriptionColumns } from "./table/subscriptionColumns";
import { purchaseColumns } from "./table/purchaseColumns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DetailedUser } from "@/types/types";
import { dummyData } from "@/dummyData";
import { Separator } from "./ui/separator";

export function TabbedTableGroup({
  users = dummyData as unknown as DetailedUser[],
  userTable = true,
  subscriptionTable = true,
  purchaseTable = true,
}: {
  users: DetailedUser[];
  userTable?: boolean;
  subscriptionTable?: boolean;
  purchaseTable?: boolean;
}) {
  const subscriptions = users.map((user) => user.subscriptions).flat();
  const purchases = users.map((user) => user.purchases).flat();
  return (
    <Tabs
      defaultValue={userTable ? "users" : "subscriptions"}
      className="h-fit w-full rounded-lg border p-2"
    >
      <TabsList className="flex w-fit content-between justify-start" loop>
        {userTable && <TabsTrigger value="users">Users</TabsTrigger>}
        {subscriptionTable && (
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        )}
        {purchaseTable && (
          <TabsTrigger value="purchases">Purchases</TabsTrigger>
        )}
      </TabsList>
      <Separator className="my-2" />
      {userTable && (
        <TabsContent value="users">
          <DataTable columns={userColumns} data={users} />
        </TabsContent>
      )}
      {subscriptionTable && (
        <TabsContent value="subscriptions">
          <DataTable columns={subscriptionColumns} data={subscriptions} />
        </TabsContent>
      )}
      {purchaseTable && (
        <TabsContent value="purchases">
          <DataTable columns={purchaseColumns} data={purchases} />
        </TabsContent>
      )}
    </Tabs>
  );
}
