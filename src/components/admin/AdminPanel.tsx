import React, { Suspense } from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import openedFolderImage from "../../assets/opened-folder.svg";
import stackedBooksImage from "../../assets/stacked-books.svg";
import Constants from "../../utils/Constants";

import AdminNavigationButton from "./navigation/AdminNavigationButton";
import AdminPanelContent from "./AdminPanelContent";
import { styled } from "@mui/material/styles";
import ManageAdminNavigationButton from "./navigation/ManageAdminNavigationButton";

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

        <AdminActionsBox>
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
          <ManageAdminNavigationButton />
        </AdminActionsBox>
      </Box>
      <Suspense fallback={<>Loading...</>}>
        <AdminPanelContent />
      </Suspense>
    </Box>
  );
};

const AdminActionsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  position: "absolute",
  right: "150px",
  bottom: "-40px",
  [theme.breakpoints.down(1434)]: {
    position: "relative",
    left: "0px",
    top: "0px",
  },
}));

export default AdminPanel;
