import React from "react";
import { useGetAllUsersQuery } from "../../api/apiSlice";
// import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
// import {
//   clearAllUsers,
//   selectAllUsers,
//   selectUsersStatus,
// } from "../../slices/usersSlice";
// import { fetchAllUsers } from "../../api/UsersAPI";
// import { User } from "../../model/User";

const AdminUsers: React.FC = () => {
  // const dispatch = useAppDispatch();
  //
  // useEffect(() => {
  //   const promise = dispatch(fetchAllUsers());
  //   return () => {
  //     promise.abort();
  //     dispatch(clearAllUsers());
  //   };
  // }, [dispatch]);
  //
  // const users = useAppSelector(selectAllUsers);
  // const status = useAppSelector(selectUsersStatus);
  // return (
  //   <>
  //     <div>All users</div>
  //     <div>{status}</div>
  //     <ul>
  //       {users.map((user: User) => (
  //         <li key={user.id}>{user.firstName}</li>
  //       ))}
  //     </ul>
  //   </>
  // );

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
