"use client";

import { DynamicTable } from "../_components/DynamicTable";

export default function UsersPage() {
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "provider", label: "Provider" },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Users</h1>
      <DynamicTable
        columns={columns}
        apiUrl="/user/get-all-users"
        editUrl="/users/edit"
        editChapter={"/users/edit"}
        hideChapter={true}
        hideCourse={true}
      />
    </div>
  );
}
