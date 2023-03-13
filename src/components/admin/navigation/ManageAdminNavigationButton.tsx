import React from "react";
import { selectAdmins, useGetAllUsersQuery } from "../../../api/adminApi";
import { useAppSelector } from "../../../hooks/ReduxHooks";
import AdminNavigationButton from "./AdminNavigationButton";
import Constants from "../../../utils/Constants";
import tuningSlidersImage from "../../../assets/tuning-sliders.svg";
import { useIntl } from "react-intl";

const ManageAdminNavigationButton: React.FC = () => {
  useGetAllUsersQuery();
  const admins = useAppSelector(selectAdmins);
  const intl = useIntl();
  return (
    <AdminNavigationButton
      id={Constants.ADMIN.PANEL.USERS}
      icon={tuningSlidersImage}
      altIconText={"Tuning sliders indicating some sort of settings"}
      header={intl.formatMessage({ id: "admin-panel-users-navigation" })}
      count={`${admins.length}`}
    />
  );
};

export default ManageAdminNavigationButton;
