import React, { useCallback, useMemo, useState } from "react";
import {
  useGetAllUsersQuery,
  useModifyAdminMutation,
} from "../../api/adminApi";
import UsersList from "../users/UsersList";
import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import { User } from "../../model/User";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import RemoveModeratorIcon from "@mui/icons-material/RemoveModerator";
import { useIntl } from "react-intl";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { selectUser } from "../../slices/userSlice";
import SearchBar from "../misc/SearchBar";
import { filterUsersByName } from "../../utils/FilterUtils";
import LoadingOverlay from "../misc/LoadingOverlay";
import ErrorAlert from "../misc/ErrorAlert";

const AdminUsers: React.FC = () => {
  const { data, isLoading, error } = useGetAllUsersQuery();
  const [modifyAdmin] = useModifyAdminMutation();
  const currentUser = useAppSelector(selectUser);
  const [activeTab, setActiveTab] = useState("admins");
  const [filterText, setFilterText] = useState("");
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const displayedData = useMemo(() => {
    let selectedData = [];
    if (activeTab === "admins") {
      selectedData = data?.filter((user) => user.admin) ?? [];
    } else {
      selectedData = data?.filter((user) => !user.admin) ?? [];
    }

    return filterUsersByName(selectedData, filterText);
  }, [data, activeTab, filterText]);

  if (isLoading) return <LoadingOverlay />;
  if (error || !data) return <ErrorAlert />;

  return (
    <Box px={3} mt={6}>
      <Paper>
        <Box px={1}>
          <Box px={2} py={2}>
            <Typography variant={"h5"} gutterBottom={true}>
              {intl.formatMessage({ id: "adminUsersHeader" })}
            </Typography>

            <Box
              sx={{
                justifyContent: "space-between",
                display: "flex",
                flex: 1,
              }}
            >
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab
                  value={"admins"}
                  label={intl.formatMessage({ id: "admins" })}
                />
                <Tab
                  value={"others"}
                  label={intl.formatMessage({ id: "others" })}
                />
              </Tabs>
              <Box width={300} py={1}>
                <SearchBar
                  fullWidth={true}
                  value={filterText}
                  setValue={setFilterText}
                  label={intl.formatMessage({ id: "admin-panel-users-search" })}
                />
              </Box>
            </Box>
          </Box>
          <Box px={2} sx={{ paddingBottom: 4 }}>
            {activeTab === "others" && (
              <UsersList
                users={displayedData}
                performAction={handleAdminToggle}
                icon={<AddModeratorIcon />}
              />
            )}
            {activeTab === "admins" && (
              <UsersList
                users={displayedData}
                performAction={handleAdminToggle}
                icon={<RemoveModeratorIcon />}
                disabled={disableElement}
              />
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
export default AdminUsers;
