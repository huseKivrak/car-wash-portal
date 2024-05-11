import { CustomerDashboard } from "@/components/CustomerDashboard";
import { getDetailedUserById } from "@/database/queries";

export default async function UserDetailPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;

  const user = await getDetailedUserById(parseInt(userId));
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col items-center">
      <CustomerDashboard user={user} />
    </div>
  );
}
