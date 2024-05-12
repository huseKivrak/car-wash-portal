import { CustomerDashboard } from "@/components/CustomerDashboard";
import { getDetailedUserById } from "@/database/queries";

export default async function UserDetailPage({
  params,
  searchParams,
}: {
  params: { userId: string };
  searchParams: { showTransferForm: string };
}) {
  const { userId } = params;
  const { showTransferForm } = searchParams;

  const user = await getDetailedUserById(parseInt(userId));
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col items-center">
      <CustomerDashboard user={user} showTransferForm={showTransferForm} />
    </div>
  );
}
