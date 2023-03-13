import { UserData } from "../../../model/User";
import { VocabularyData } from "../../../model/Vocabulary";
import React, { useState } from "react";
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
  const [status, setStatus] = useState<string>("pending");
  const handleAccept = () => {
    console.log(`${user.firstName} was assigned to ${vocabulary.label}`);
    setStatus("accepted");
    performActionCallback(gestorRequest, true);
  };
  const handleDecline = () => {
    console.log(`${user.firstName} was NOT assigned to ${vocabulary.label}`);
    setStatus("declined");
    performActionCallback(gestorRequest, false);
  };

  return (
    <GestorRequestUserListItem
      user={user}
      status={status}
      acceptAction={handleAccept}
      declineAction={handleDecline}
    />
  );
};

export default GestorRequestUserAction;
