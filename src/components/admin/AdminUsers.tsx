import React, { useCallback, useMemo } from "react";
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
import { useAppSelector } from "../../hooks/ReduxHooks";
import { selectUser } from "../../slices/userSlice";

const AdminUsers: React.FC = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  const [modifyAdmin] = useModifyAdminMutation();
  const currentUser = useAppSelector(selectUser);
  const intl = useIntl();

  const handleAdminToggle = useCallback(
    (user: User) => {
      modifyAdmin({ admin: !user.admin, id: user.id }).then(() => {
        console.log(`User: ${user.id} is admin: ${!user.admin}`);
      });
    },
    [modifyAdmin]
  );
  const disableElement = (user: User) => {
    return user.id === currentUser.id;
  };

  //This works better than custom selectFromResult (less rerenders)
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

  return (
    <Box px={3} mt={8}>
      <Paper>
        <Box px={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Box px={2}>
                <Typography variant={"h5"} gutterBottom={true}>
                  {intl.formatMessage({ id: "adminUsersHeader" })}
                </Typography>
                <hr />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box px={2} sx={{ paddingBottom: 4 }}>
                <Typography variant={"h6"}>
                  {intl.formatMessage({ id: "others" })}
                </Typography>
                <UsersList
                  users={others}
                  performAction={handleAdminToggle}
                  icon={<AddModeratorIcon />}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box px={2} sx={{ paddingBottom: 4 }}>
                <Typography variant={"h6"}>
                  {intl.formatMessage({ id: "admins" })}
                </Typography>
                <UsersList
                  users={admins}
                  performAction={handleAdminToggle}
                  icon={<RemoveModeratorIcon />}
                  disabled={disableElement}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};
export default AdminUsers;
