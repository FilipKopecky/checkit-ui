import React, { useMemo } from "react";
import {
  useGetAllUsersQuery,
  useModifyAdminMutation,
} from "../../api/apiSlice";
import UsersList from "../users/UsersList";
import { Box, Grid, Paper, Typography } from "@mui/material";
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

  const handleAdminToggle = (user: User) => {
    modifyAdmin({ admin: !user.admin, id: user.id }).then(() => {
      console.log(`User: ${user.id} is admin: ${!user.admin}`);
    });
  };

  return (
    <Grid container spacing={2} px={3}>
      <Grid item xs={12} md={6}>
        <Paper>
          <Box p={2}>
            <Typography variant={"h6"}>
              {intl.formatMessage({ id: "others" })}
            </Typography>
            <UsersList
              users={others}
              performAction={handleAdminToggle}
              icon={<AddModeratorIcon />}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <Box p={2}>
            <Typography variant={"h6"}>
              {intl.formatMessage({ id: "admins" })}
            </Typography>
            <UsersList
              users={admins}
              performAction={handleAdminToggle}
              icon={<RemoveModeratorIcon />}
            />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default AdminUsers;
