import React from "react";
import { Vocabulary } from "../../model/Vocabulary";
import { Virtuoso } from "react-virtuoso";
import List from "../misc/VirtuosoMuiList";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import UsersAvatarGroup from "../users/UsersAvatarGroup";
import { Box, Tooltip } from "@mui/material";
import EmptyPlaceholder from "../misc/VirtuosoEmptyPlaceholder";

interface VocabulariesListProps {
  vocabularies: Vocabulary[];
  action?: (vocabulary: Vocabulary) => void;
  actionDescription?: string;
  gestorsClick: (vocabulary: Vocabulary) => void;
  actionIcon?: React.ReactNode;
  disabled?: (vocabulary: Vocabulary) => boolean;
  additionalInfo?: (vocabulary: Vocabulary) => React.ReactNode;
}

const VocabulariesList: React.FC<VocabulariesListProps> = ({
  vocabularies,
  action,
  actionDescription,
  gestorsClick,
  actionIcon,
  disabled = () => false,
  additionalInfo = () => undefined,
}) => {
  const itemContent = (index: any, vocabulary: any) => {
    return (
      <InnerItem
        index={index}
        vocabulary={vocabulary}
        callback={action}
        actionDescription={actionDescription}
        icon={actionIcon}
        disabled={disabled}
        gestorsClick={gestorsClick}
        additionalInfo={additionalInfo}
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
    actionDescription,
    gestorsClick,
    icon,
    disabled,
    additionalInfo,
  }: {
    index: number;
    vocabulary: Vocabulary;
    callback?: (vocabulary: Vocabulary) => void;
    actionDescription?: string;
    gestorsClick: (vocabulary: Vocabulary) => void;
    icon: React.ReactNode;
    disabled: (vocabulary: Vocabulary) => boolean;
    additionalInfo: (vocabulary: Vocabulary) => React.ReactNode;
  }) => {
    const elementDisabled = disabled(vocabulary);
    return (
      <>
        <ListItem
          sx={{
            backgroundColor:
              index % 2 === 0 ? "background.default" : "background.paper",
          }}
          secondaryAction={
            callback ? (
              <Tooltip title={actionDescription} placement={"left"}>
                <IconButton
                  disabled={elementDisabled}
                  edge="end"
                  onClick={() => {
                    callback(vocabulary);
                  }}
                >
                  {icon}
                </IconButton>
              </Tooltip>
            ) : undefined
          }
        >
          <ListItemText primary={vocabulary.label} />
          <Box>{additionalInfo(vocabulary)}</Box>
          <Box mr={4} display={"flex"} width={"110px"}>
            <Box width={"100%"}></Box>
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
