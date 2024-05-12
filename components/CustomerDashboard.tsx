"use client";
import { DetailedUser } from "@/types/types";
import { useRouter } from "next/navigation";
import { TabbedTableGroup } from "./TabbedTableGroup";
import { TransferSubscriptionForm } from "./forms/TransferSubscriptionForm";
import { UserOverview } from "./UserOverview";

export function CustomerDashboard({
  user,
  showTransferForm,
}: {
  user: DetailedUser;
  showTransferForm: string;
}) {
  const router = useRouter();
  const redirectAfterForm = () => {
    router.push(`/users/${user.id}`);
  };
  return (
    <div className="flex w-full flex-row space-x-4">
      {showTransferForm === "true" ? (
        <TransferSubscriptionForm user={user} onSuccess={redirectAfterForm} />
      ) : (
        <>
          <UserOverview user={user} />
          <TabbedTableGroup users={[user]} userTable={false} />
        </>
      )}
    </div>
  );
}
