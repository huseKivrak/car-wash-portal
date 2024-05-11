import { getAllDetailedUsers } from "@/database/queries";
import { UsersAutocomplete } from "@/components/UsersAutocomplete";
import { dummyData } from "@/dummyData";
import { DetailedUser } from "@/types/types";
import { TabbedTableGroup } from "@/components/TabbedTableGroup";

export default async function App() {
  const users = await getAllDetailedUsers();

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-extrabold tracking-tight text-primary lg:text-5xl">
        AMP Customer Service Portal
      </h1>
      <UsersAutocomplete users={users} />
    </div>
  );
}
