import React, { Suspense } from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import openedFolderImage from "../../assets/opened-folder.svg";
import stackedBooksImage from "../../assets/stacked-books.svg";
import tuningSlidersImage from "../../assets/tuning-sliders.svg";
import Constants from "../../utils/Constants";

import AdminNavigationButton from "./AdminNavigationButton";
import AdminPanelContent from "./AdminPanelContent";

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
        mb={10}
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
            id={Constants.ADMIN.PANEL.REQUESTS}
            icon={openedFolderImage}
            altIconText={"Opened folder containg a letter"}
            header={intl.formatMessage({
              id: "admin-panel-requests-navigation",
            })}
            count={"5"}
          />
          <AdminNavigationButton
            id={Constants.ADMIN.PANEL.VOCABULARIES}
            icon={stackedBooksImage}
            altIconText={"Books stacked on top of each other"}
            header={intl.formatMessage({
              id: "admin-panel-assigned-vocabularies-navigation",
            })}
            count={"47"}
            outOf={"73"}
          />
          <AdminNavigationButton
            id={Constants.ADMIN.PANEL.USERS}
            icon={tuningSlidersImage}
            altIconText={"Tuning sliders indicating some sort of settings"}
            header={intl.formatMessage({ id: "admin-panel-users-navigation" })}
            count={"1"}
          />
        </Box>
      </Box>
      <Suspense fallback={<>Loading...</>}>
        <AdminPanelContent />
      </Suspense>
    </Box>
  );
};

export default AdminPanel;
