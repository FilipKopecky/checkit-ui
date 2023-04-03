import React from "react";
import {
  useGetAdminPanelSummaryQuery,
  useGetAllUsersQuery,
} from "../../../api/adminApi";
import AdminNavigationButton from "./AdminNavigationButton";
import Constants from "../../../utils/Constants";
import tuningSlidersImage from "../../../assets/tuning-sliders.svg";
import { useIntl } from "react-intl";
import LoadingOverlay from "../../misc/LoadingOverlay";
import ErrorAlert from "../../misc/ErrorAlert";

const ManageAdminNavigationButton: React.FC = () => {
  useGetAllUsersQuery();
  const { data, isLoading, error } = useGetAdminPanelSummaryQuery();
  const intl = useIntl();
  if (isLoading) return <LoadingOverlay />;
  if (error || !data) return <ErrorAlert />;
  return (
    <AdminNavigationButton
      id={Constants.ADMIN.PANEL.USERS}
      icon={tuningSlidersImage}
      altIconText={"Tuning sliders indicating some sort of settings"}
      header={intl.formatMessage({ id: "admin-panel-users-navigation" })}
      count={`${data?.adminCount ?? 0}`}
    />
  );
};

export default ManageAdminNavigationButton;
