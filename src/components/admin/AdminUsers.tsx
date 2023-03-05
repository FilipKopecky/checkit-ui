import React, { useMemo } from "react";
import {
  useGetAllUsersQuery,
  useModifyAdminMutation,
} from "../../api/apiSlice";
import UsersList from "../users/UsersList";
import { Box, Container, Paper, Typography } from "@mui/material";
import { User } from "../../model/User";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import RemoveModeratorIcon from "@mui/icons-material/RemoveModerator";
import { useIntl } from "react-intl";

const AdminUsers: React.FC = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  const [modifyAdmin] = useModifyAdminMutation();
  const intl = useIntl();

  //TODO: Optimize this, so the array is not iterated twice
  const admins = useMemo(() => {
    return data?.filter((user) => user.admin) ?? [];
  }, [data]);
  const others = useMemo(() => {
    return data?.filter((user) => !user.admin) ?? [];
  }, [data]);

  if (isLoading) {
    return <>Loading</>;
  }

  if (!data) {
    return null;
  }

  const handleAddAdmin = (user: User) => {
    modifyAdmin({ admin: !user.admin, id: user.id }).then(() => {
      console.log("Admin modified");
    });
  };

  return (
    <Container>
      <Paper>
        <Box p={2}>
          <Typography variant={"h6"}>
            {intl.formatMessage({ id: "admins" })}
          </Typography>
          <UsersList
            users={admins}
            performAction={handleAddAdmin}
            icon={<RemoveModeratorIcon />}
          />
          <Typography variant={"h6"}>
            {intl.formatMessage({ id: "others" })}
          </Typography>
          <UsersList
            users={others}
            performAction={handleAddAdmin}
            icon={<AddModeratorIcon />}
          />
        </Box>
      </Paper>
    </Container>
  );
};
export default AdminUsers;
