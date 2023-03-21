import React from "react";
import Box from "@mui/material/Box";
import NavigationCard from "./NavigationCard";
import Routes from "../../utils/Routes";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import PlaylistAddCheckCircleOutlinedIcon from "@mui/icons-material/PlaylistAddCheckCircleOutlined";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { selectUser } from "../../slices/userSlice";
import { useIntl } from "react-intl";

const HomeNavigationButtons: React.FC = () => {
  const user = useAppSelector(selectUser);
  const intl = useIntl();
  return (
    <Box display={"flex"} sx={{ gap: 2 }}>
      {user.isAdmin && (
        <NavigationCard
          route={`/${Routes.ADMINISTRATION}`}
          color={"#E66E19"}
          header={intl.formatMessage({ id: "admin-panel-navigation" })}
          description={intl.formatMessage({
            id: "admin-panel-navigation-description",
          })}
          icon={<SupervisedUserCircleOutlinedIcon fontSize={"large"} />}
        />
      )}
      <NavigationCard
        route={`/${Routes.PUBLICATIONS}`}
        color={"#E6D519"}
        header={intl.formatMessage({ id: "publication-navigation" })}
        description={intl.formatMessage({
          id: "publication-navigation-description",
        })}
        icon={<PlaylistAddCheckCircleOutlinedIcon fontSize={"large"} />}
      />
      <NavigationCard
        route={`/${Routes.REQUESTS}`}
        color={"#0FA958"}
        header={intl.formatMessage({ id: "gestor-request-navigation" })}
        description={intl.formatMessage({
          id: "gestor-request-navigation-description",
        })}
        icon={<EmojiPeopleOutlinedIcon fontSize={"large"} />}
      />
    </Box>
  );
};

export default HomeNavigationButtons;
