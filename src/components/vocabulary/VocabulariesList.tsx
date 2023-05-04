import React from "react";
import { PublicationVocabularyData, Vocabulary } from "../../model/Vocabulary";
import { Virtuoso } from "react-virtuoso";
import List from "../misc/VirtuosoMuiList";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import UsersAvatarGroup from "../users/UsersAvatarGroup";
import { Box, Tooltip, Typography } from "@mui/material";
import EmptyPlaceholder from "../misc/VirtuosoEmptyPlaceholder";
import CheckIcon from "@mui/icons-material/Check";
import NoMaxWidthTooltip from "../misc/NoMaxWidthTooltip";
import { useIntl } from "react-intl";
interface VocabulariesListProps {
  vocabularies: Vocabulary[] | PublicationVocabularyData[];
  action?: (vocabulary: Vocabulary) => void;
  actionDescription?: string;
  gestorsClick: (vocabulary: Vocabulary) => void;
  actionIcon?: React.ReactNode;
  disabled?: (vocabulary: Vocabulary) => boolean;
  //TODO: fix the any
  additionalInfo?: (vocabulary: any) => React.ReactNode;
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
    vocabulary: Vocabulary | PublicationVocabularyData;
    callback?: (vocabulary: Vocabulary) => void;
    actionDescription?: string;
    gestorsClick: (vocabulary: Vocabulary) => void;
    icon: React.ReactNode;
    disabled: (vocabulary: Vocabulary) => boolean;
    additionalInfo: (vocabulary: Vocabulary) => React.ReactNode;
  }) => {
    const intl = useIntl();
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
                <span>
                  <IconButton
                    disabled={elementDisabled}
                    edge="end"
                    onClick={() => {
                      callback(vocabulary);
                    }}
                  >
                    {icon}
                  </IconButton>
                </span>
              </Tooltip>
            ) : undefined
          }
        >
          {"approvedByUsers" in vocabulary &&
            vocabulary.approvedByUsers.length !== 0 && (
              <NoMaxWidthTooltip
                title={
                  <>
                    <Typography fontSize={14}>
                      {intl.formatMessage({ id: "approved-by-gestors" })}
                    </Typography>
                    {vocabulary.approvedByUsers.map((user) => (
                      <Typography
                        fontSize={14}
                      >{`${user.firstName} ${user.lastName}`}</Typography>
                    ))}
                  </>
                }
                placement={"top"}
              >
                <CheckIcon sx={{ marginRight: 1 }} color={"success"} />
              </NoMaxWidthTooltip>
            )}
          <Box
            sx={{
              justifyContent: "space-between",
              display: "flex",
              flex: 1,
            }}
            pr={1}
          >
            <ListItemText
              primary={vocabulary.label}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            />
            <Box
              display={"flex"}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box>{additionalInfo(vocabulary)}</Box>
              <Box display={"flex"} width={"110px"}>
                <Box flexGrow={1}></Box>
                {vocabulary.gestors.length > 0 && (
                  <UsersAvatarGroup
                    users={vocabulary.gestors}
                    maxAvatars={4}
                    onClick={() => gestorsClick(vocabulary)}
                  />
                )}
              </Box>
            </Box>
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
