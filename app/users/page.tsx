import { userColumns } from "../../components/table/userColumns";
import { DataTable } from "@/components/table/data-table";
import { getAllDetailedUsers } from "@/database/queries";
import { dummyData } from "@/dummyData";

export default async function UsersListPage() {
  const users = await getAllDetailedUsers();
  return (
    <div className="flex flex-col">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-primary lg:text-5xl">
        All Users
      </h1>
      <DataTable columns={userColumns} data={users} />
    </div>
  );
}
