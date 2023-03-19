import React, { useState } from "react";
import AssignedVocabulariesModal from "../admin/AssignedVocabulariesModal";
import { Vocabulary } from "../../model/Vocabulary";
import VocabulariesList from "./VocabulariesList";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { useIntl } from "react-intl";

interface VocabularyListProps {
  vocabularies: Vocabulary[];
}

const AssignedVocabulariesList: React.FC<VocabularyListProps> = ({
  vocabularies,
}) => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const [vocabularyUri, setVocabularyUri] = useState("");

  const callback = (vocabalury: Vocabulary) => {
    setOpen(true);
    setVocabularyUri(vocabalury.uri);
  };

  return (
    <>
      <VocabulariesList
        vocabularies={vocabularies}
        action={callback}
        actionIcon={<ManageAccountsOutlinedIcon />}
        actionDescription={intl.formatMessage({
          id: "assignedVocabulariesAction",
        })}
        gestorsClick={(vocabulary) => console.log(vocabulary)}
      />
      <AssignedVocabulariesModal
        open={open}
        setOpen={setOpen}
        vocabularyUri={vocabularyUri}
      />
    </>
  );
};

export default AssignedVocabulariesList;
