import React from "react";
import { useGetAllUsersQuery } from "../../api/apiSlice";

const AdminUsers: React.FC = () => {
  const { data, isLoading, isSuccess } = useGetAllUsersQuery();
  if (isLoading) {
    return <>Loading</>;
  }
  if (isSuccess) {
    console.log(data);
    return <>Success</>;
  }
  return <></>;
};

export default AdminUsers;
