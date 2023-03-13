import React, { Suspense } from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import AdminPanelContent from "./AdminPanelContent";
import { styled } from "@mui/material/styles";
import ManageAdminNavigationButton from "./navigation/ManageAdminNavigationButton";
import ManageVocabulariesNavigationButton from "./navigation/ManageVocabulariesNavigationButton";
import ManageGestorRequestsNavigationButton from "./navigation/ManageGestorRequestsNavigationButton";

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
        mb={2}
      >
        <Typography variant={"h4"}>
          {intl.formatMessage({ id: "admin-panel-header" })}
        </Typography>
        <Typography variant={"body1"} gutterBottom>
          {intl.formatMessage({ id: "admin-panel-header-subtext" })}
        </Typography>
        <AdminActionsBox>
          <ManageGestorRequestsNavigationButton />
          <ManageVocabulariesNavigationButton />
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
