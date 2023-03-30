import React, { useState } from "react";
import AssignedVocabulariesModal from "../admin/AssignedVocabulariesModal";
import { Vocabulary } from "../../model/Vocabulary";
import VocabulariesList from "./VocabulariesList";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { useIntl } from "react-intl";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { changeModalTab } from "../../slices/adminPanelSlice";

interface VocabularyListProps {
  vocabularies: Vocabulary[];
}

const AssignedVocabulariesList: React.FC<VocabularyListProps> = ({
  vocabularies,
}) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [vocabularyUri, setVocabularyUri] = useState("");

  const callback = (vocabalury: Vocabulary) => {
    setOpen(true);
    setVocabularyUri(vocabalury.uri);
  };

  const handleGestorClick = (vocabulary: Vocabulary) => {
    dispatch(changeModalTab("gestors"));
    callback(vocabulary);
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
        gestorsClick={handleGestorClick}
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
