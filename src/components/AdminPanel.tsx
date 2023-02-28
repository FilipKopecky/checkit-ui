import React from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import openedFolderImage from "../assets/opened-folder.svg";
import stackedBooksImage from "../assets/stacked-books.svg";
import tuningSlidersImage from "../assets/tuning-sliders.svg";

import AdminNavigationButton from "./AdminNavigationButton";
import Routes from "../utils/Routes";
import {Outlet} from "react-router-dom";


//TODO: Implement real data
const AdminPanel: React.FC = () => {
  const intl = useIntl();
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          position: "relative",
        }}
        p={3}
      >
        <Typography variant={"h4"}>
          {intl.formatMessage({ id: "admin-panel-header" })}
        </Typography>
        <Typography variant={"body1"} gutterBottom>
          {intl.formatMessage({ id: "admin-panel-header-subtext" })}
        </Typography>

        <Box
          display={"flex"}
          sx={{
            position: "absolute",
            right: "50px",
            bottom: "-80px",
          }}
        >
          <AdminNavigationButton
            icon={openedFolderImage}
            altIconText={"Opened folder containg a letter"}
            header={intl.formatMessage({id: "admin-panel-requests-navigation"})}
            count={"5"}
            route={Routes.ADMINISTRATION.REQUESTS}
          />
          <AdminNavigationButton
            icon={stackedBooksImage}
            altIconText={"Books stacked on top of each other"}
            header={intl.formatMessage({id: "admin-panel-assigned-vocabularies-navigation"})}
            count={"47"}
            outOf={"73"}
            route={Routes.ADMINISTRATION.VOCABULARIES}
          />
          <AdminNavigationButton
            icon={tuningSlidersImage}
            altIconText={"Tuning sliders indicating some sort of settings"}
            header={intl.formatMessage({id: "admin-panel-users-navigation"})}
            count={"1"}
            route={Routes.ADMINISTRATION.USERS}
          />
        </Box>
      </Box>
      <Outlet />
    </Box>
  );
};

export default AdminPanel;
