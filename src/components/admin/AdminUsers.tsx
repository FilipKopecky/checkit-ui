import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import {
  clearAllUsers,
  selectAllUsers,
  selectUsersStatus,
} from "../../slices/usersSlice";
import { fetchAllUsers } from "../../api/UsersAPI";
import { User } from "../../model/User";

const AdminUsers: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(fetchAllUsers());
    return () => {
      promise.abort();
      dispatch(clearAllUsers());
    };
  }, [dispatch]);

  const users = useAppSelector(selectAllUsers);
  const status = useAppSelector(selectUsersStatus);
  return (
    <>
      <div>All users</div>
      <div>{status}</div>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>{user.firstName}</li>
        ))}
      </ul>
    </>
  );
};

export default AdminUsers;
