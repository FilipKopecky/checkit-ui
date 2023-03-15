import { UserData } from "../../../model/User";
import { VocabularyData } from "../../../model/Vocabulary";
import React from "react";
import GestorRequestUserListItem from "./GestorRequestUserListItem";
import { GestorRequest } from "../../../model/GestorRequest";

interface GestorRequestUserActionProps {
  user: UserData;
  vocabulary: VocabularyData;
  gestorRequest: GestorRequest;
  performActionCallback: (request: GestorRequest, accepted: boolean) => void;
}
const GestorRequestUserAction: React.FC<GestorRequestUserActionProps> = ({
  user,
  vocabulary,
  performActionCallback,
  gestorRequest,
}) => {
  const handleAccept = () => {
    console.log(`${user.firstName} was assigned to ${vocabulary.label}`);
    performActionCallback(gestorRequest, true);
  };
  const handleDecline = () => {
    console.log(`${user.firstName} was NOT assigned to ${vocabulary.label}`);
    performActionCallback(gestorRequest, false);
  };

  return (
    <GestorRequestUserListItem
      user={user}
      status={gestorRequest.state}
      acceptAction={handleAccept}
      declineAction={handleDecline}
    />
  );
};

export default GestorRequestUserAction;
