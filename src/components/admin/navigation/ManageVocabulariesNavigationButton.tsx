import React from "react";
import AdminNavigationButton from "./AdminNavigationButton";
import Constants from "../../../utils/Constants";
import stackedBooksImage from "../../../assets/stacked-books.svg";
import { useIntl } from "react-intl";

const ManageVocabulariesNavigationButton: React.FC = () => {
  const intl = useIntl();
  return (
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
  );
};

export default ManageVocabulariesNavigationButton;
