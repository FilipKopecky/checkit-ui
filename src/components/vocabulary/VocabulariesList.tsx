import React from "react";
import { Vocabulary } from "../../model/Vocabulary";
import { Virtuoso } from "react-virtuoso";
import List from "../misc/VirtuosoMuiList";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import UsersAvatarGroup from "../users/UsersAvatarGroup";
import { Box } from "@mui/material";
import { useIntl } from "react-intl";
import EmptyPlaceholder from "../misc/VirtuosoEmptyPlaceholder";

interface VocabulariesListProps {
  vocabularies: Vocabulary[];
  action?: (vocabulary: Vocabulary) => void;
  gestorsClick: (vocabulary: Vocabulary) => void;
  actionIcon?: React.ReactNode;
  disabled?: (user: Vocabulary) => boolean;
}

const VocabulariesList: React.FC<VocabulariesListProps> = ({
  vocabularies,
  action,
  gestorsClick,
  actionIcon,
  disabled = () => false,
}) => {
  const intl = useIntl();
  const itemContent = (index: any, vocabulary: any) => {
    return (
      <InnerItem
        index={index}
        vocabulary={vocabulary}
        callback={action}
        icon={actionIcon}
        disabled={disabled}
        gestorsClick={gestorsClick}
      />
    );
  };

  return (
    <Virtuoso
      style={{ height: 400 }}
      components={{
        List,
        EmptyPlaceholder: EmptyPlaceholder,
      }}
      data={vocabularies}
      itemContent={itemContent}
    />
  );
};

const InnerItem = React.memo(
  ({
    index,
    vocabulary,
    callback,
    gestorsClick,
    icon,
    disabled,
  }: {
    index: number;
    vocabulary: Vocabulary;
    callback?: (vocabulary: Vocabulary) => void;
    gestorsClick: (vocabulary: Vocabulary) => void;
    icon: React.ReactNode;
    disabled: (user: Vocabulary) => boolean;
  }) => {
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
                disabled={disabled(vocabulary)}
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
          <Box mr={4}>
            {vocabulary.gestors.length > 0 && (
              <UsersAvatarGroup
                users={vocabulary.gestors}
                maxAvatars={4}
                onClick={() => gestorsClick(vocabulary)}
              />
            )}
          </Box>
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
