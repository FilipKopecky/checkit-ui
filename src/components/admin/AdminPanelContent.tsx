import React from "react";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { selectAdminPanel } from "../../slices/adminPanelSlice";
import Constants from "../../utils/Constants";

const GestorRequests = React.lazy(() => import("./GestorRequests"));
const AssignedVocabularies = React.lazy(() => import("./AssignedVocabularies"));
const AdminUsers = React.lazy(() => import("./AdminUsers"));

const AdminPanelContent: React.FC = () => {
  const adminPanelSelector = useAppSelector(selectAdminPanel);
  switch (adminPanelSelector.activeTab) {
    case Constants.ADMIN.PANEL.REQUESTS:
      return <GestorRequests />;
    case Constants.ADMIN.PANEL.VOCABULARIES:
      return <AssignedVocabularies />;
    case Constants.ADMIN.PANEL.USERS:
      return <AdminUsers />;
    default:
      return <>Content not found</>;
  }
};

export default AdminPanelContent;
