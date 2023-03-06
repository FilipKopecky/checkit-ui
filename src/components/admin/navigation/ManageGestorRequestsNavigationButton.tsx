import React from 'react';
import AdminNavigationButton from "./AdminNavigationButton";
import Constants from "../../../utils/Constants";
import openedFolderImage from "../../../assets/opened-folder.svg";
import { useIntl } from "react-intl";

const ManageGestorRequestsNavigationButton:React.FC = () => {
    const intl = useIntl();
    return (
        <AdminNavigationButton
            id={Constants.ADMIN.PANEL.REQUESTS}
            icon={openedFolderImage}
            altIconText={"Opened folder containg a letter"}
            header={intl.formatMessage({
                id: "admin-panel-requests-navigation",
            })}
            count={"5"}
        />
    );
};

export default ManageGestorRequestsNavigationButton;
