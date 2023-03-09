import React, { useState } from "react";
import { Virtuoso } from "react-virtuoso";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import AssignedVocabulariesModal from "../admin/AssignedVocabulariesModal";
import List from "../misc/VirtuosoMuiList";
import { Vocabulary } from "../../model/Vocabulary";

interface VocabularyListProps {
  vocabularies: Vocabulary[];
}
const VocabularyList: React.FC<VocabularyListProps> = ({ vocabularies }) => {
  const [open, setOpen] = useState(false);
  const [vocabularyUri, setVocabularyUri] = useState("");

  const itemContent = (index: any, vocabulary: any) => {
    return (
      <InnerItem
        index={index}
        vocabulary={vocabulary}
        setOpen={setOpen}
        setVocabulary={setVocabularyUri}
      />
    );
  };

  return (
    <>
      <Virtuoso
        style={{ height: 400 }}
        components={{ List }}
        data={vocabularies}
        itemContent={itemContent}
      />
      <AssignedVocabulariesModal
        open={open}
        setOpen={setOpen}
        vocabularyUri={vocabularyUri}
      />
    </>
  );
};
const InnerItem = React.memo(
  ({ index, vocabulary, setOpen, setVocabulary }: any) => {
    return (
      <>
        <ListItem
          sx={{
            backgroundColor:
              index % 2 === 0 ? "background.default" : "background.paper",
          }}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => {
                setOpen(true);
                setVocabulary(vocabulary.uri);
              }}
            >
              <ManageAccountsOutlinedIcon />
            </IconButton>
          }
        >
          <ListItemText primary={vocabulary.label} />
        </ListItem>
      </>
    );
  }
);

export default VocabularyList;
