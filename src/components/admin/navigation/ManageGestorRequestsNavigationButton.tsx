import React from "react";
import AdminNavigationButton from "./AdminNavigationButton";
import Constants from "../../../utils/Constants";
import openedFolderImage from "../../../assets/opened-folder.svg";
import { useIntl } from "react-intl";
import { useGetAdminPanelSummaryQuery } from "../../../api/adminApi";
import LoadingOverlay from "../../misc/LoadingOverlay";
import ErrorAlert from "../../misc/ErrorAlert";

const ManageGestorRequestsNavigationButton: React.FC = () => {
  const intl = useIntl();
  const { data, isLoading, error } = useGetAdminPanelSummaryQuery();
  if (isLoading) return <LoadingOverlay />;
  if (error || !data) return <ErrorAlert />;
  return (
    <AdminNavigationButton
      id={Constants.ADMIN.PANEL.REQUESTS}
      icon={openedFolderImage}
      altIconText={"Opened folder containg a letter"}
      header={intl.formatMessage({
        id: "admin-panel-requests-navigation",
      })}
      count={`${data?.pendingGestoringRequestCount ?? 0}`}
    />
  );
};

export default ManageGestorRequestsNavigationButton;
