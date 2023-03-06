import React from "react";
import List from "@mui/material/List";
import SideBarLink from "./SideBarLink";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Routes from "../../utils/Routes";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import PlaylistAddCheckCircleOutlinedIcon from "@mui/icons-material/PlaylistAddCheckCircleOutlined";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import Box from "@mui/material/Box";
import LogoutButton from "../routing/LogoutButton";
import { useIntl } from "react-intl";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { selectUser } from "../../slices/userSlice";

interface SideBarContentProps {
  open: boolean;
}

const SideBarContent: React.FC<SideBarContentProps> = ({ open }) => {
  const intl = useIntl();
  const user = useAppSelector(selectUser);
  return (
    <>
      <List>
        <SideBarLink
          open={open}
          label={intl.formatMessage({ id: "home-navigation" })}
          icon={<HomeOutlinedIcon color={"secondary"} />}
          route={Routes.HOME}
        />
        {user.isAdmin && (
          <SideBarLink
            open={open}
            label={intl.formatMessage({ id: "admin-panel-navigation" })}
            icon={<SupervisedUserCircleOutlinedIcon color={"secondary"} />}
            route={Routes.ADMINISTRATION}
          />
        )}
        <SideBarLink
          open={open}
          label={intl.formatMessage({ id: "publication-navigation" })}
          icon={<PlaylistAddCheckCircleOutlinedIcon color={"secondary"} />}
          route={Routes.PUBLICATIONS}
        />
        <SideBarLink
          open={open}
          label={intl.formatMessage({ id: "gestor-request-navigation" })}
          icon={<EmojiPeopleOutlinedIcon color={"secondary"} />}
          route={Routes.REQUESTS}
        />
      </List>
      <Box style={{ marginTop: "auto", color: "white" }}>
        <LogoutButton open={open} />
      </Box>
    </>
  );
};

export default SideBarContent;
