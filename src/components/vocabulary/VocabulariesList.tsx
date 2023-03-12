import React from "react";
import { Vocabulary } from "../../model/Vocabulary";
import { Virtuoso } from "react-virtuoso";
import List from "../misc/VirtuosoMuiList";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";

interface VocabulariesListProps {
  vocabularies: Vocabulary[];
  action?: (vocabulary: Vocabulary) => void;
  actionIcon?: React.ReactNode;
}

const VocabulariesList: React.FC<VocabulariesListProps> = ({
  vocabularies,
  action,
  actionIcon,
}) => {
  const itemContent = (index: any, vocabulary: any) => {
    return (
      <InnerItem
        index={index}
        vocabulary={vocabulary}
        callback={action}
        icon={actionIcon}
      />
    );
  };

  return (
    <Virtuoso
      style={{ height: 400 }}
      components={{ List }}
      data={vocabularies}
      itemContent={itemContent}
    />
  );
};

const InnerItem = React.memo(
  ({ index, vocabulary, callback, icon }: any) => {
    return (
      <>
        <ListItem
          sx={{
            backgroundColor:
              index % 2 === 0 ? "background.default" : "background.paper",
          }}
          secondaryAction={
            callback ? (
              <IconButton
                edge="end"
                onClick={() => {
                  callback(vocabulary);
                }}
              >
                {icon}
              </IconButton>
            ) : undefined
          }
        >
          <ListItemText primary={vocabulary.label} />
        </ListItem>
      </>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.vocabulary.uri === nextProps.vocabulary.uri &&
      prevProps.callback === nextProps.callback
    );
  }
);

export default VocabulariesList;
