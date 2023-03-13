import { UserData } from "../../../model/User";
import { VocabularyData } from "../../../model/Vocabulary";
import React, { useState } from "react";
import GestorRequestUserListItem from "./GestorRequestUserListItem";

interface GestorRequestUserActionProps {
  user: UserData;
  vocabulary: VocabularyData;
  performActionCallback: () => void;
}
const GestorRequestUserAction: React.FC<GestorRequestUserActionProps> = ({
  user,
  vocabulary,
  performActionCallback,
}) => {
  const [status, setStatus] = useState<string>("pending");
  const handleAccept = () => {
    console.log(`${user.firstName} was assigned to ${vocabulary.label}`);
    setStatus("accepted");
    performActionCallback();
  };
  const handleDecline = () => {
    console.log(`${user.firstName} was NOT assigned to ${vocabulary.label}`);
    setStatus("declined");
    performActionCallback();
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
