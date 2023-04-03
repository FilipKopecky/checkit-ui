import React from "react";
import AdminNavigationButton from "./AdminNavigationButton";
import Constants from "../../../utils/Constants";
import stackedBooksImage from "../../../assets/stacked-books.svg";
import { useIntl } from "react-intl";
import { useGetAdminPanelSummaryQuery } from "../../../api/adminApi";
import LoadingOverlay from "../../misc/LoadingOverlay";
import ErrorAlert from "../../misc/ErrorAlert";

const ManageVocabulariesNavigationButton: React.FC = () => {
  const intl = useIntl();
  const { data, isLoading, error } = useGetAdminPanelSummaryQuery();
  if (isLoading) return <LoadingOverlay />;
  if (error || !data) return <ErrorAlert />;
  return (
    <AdminNavigationButton
      id={Constants.ADMIN.PANEL.VOCABULARIES}
      icon={stackedBooksImage}
      altIconText={"Books stacked on top of each other"}
      header={intl.formatMessage({
        id: "admin-panel-assigned-vocabularies-navigation",
      })}
      count={`${data?.vocabularyWithGestorCount ?? 0}`}
      outOf={`${data?.vocabularyCount ?? 0}`}
    />
  );
};

export default ManageVocabulariesNavigationButton;
