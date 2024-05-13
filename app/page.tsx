import { getAllDetailedUsers } from "@/database/queries";
import { TabbedTableGroup } from "@/components/TabbedTableGroup";

export default async function App() {
  const users = await getAllDetailedUsers();

  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-4xl font-extrabold tracking-tight text-primary lg:text-5xl">
        AMP Customer Service Portal
      </h1>
      <TabbedTableGroup users={users} />
    </div>
  );
}
