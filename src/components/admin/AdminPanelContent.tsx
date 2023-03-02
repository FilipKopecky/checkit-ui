import React from "react";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { selectAdminPanel } from "../../slices/adminPanelSlice";
import Constants from "../../utils/Constants";

const GestorRequests = React.lazy(() => import("./GestorRequests"));
const AssignedVocabularies = React.lazy(() => import("./AssignedVocabularies"));
const AdminUsers = React.lazy(() => import("./AdminUsers"));

const AdminPanelContent: React.FC = () => {
  const adminPanelSelector = useAppSelector(selectAdminPanel);
  let content;
  switch (adminPanelSelector.activeTab) {
    case Constants.ADMIN.PANEL.REQUESTS:
      content = <GestorRequests />;
      break;
    case Constants.ADMIN.PANEL.VOCABULARIES:
      content = <AssignedVocabularies />;
      break;
    case Constants.ADMIN.PANEL.USERS:
      content = <AdminUsers />;
      break;
    default:
      content = <>Content not found</>;
  }
  return <div data-testid="admin-panel-content">{content}</div>;
};

export default AdminPanelContent;
