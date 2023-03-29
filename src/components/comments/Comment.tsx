import React from "react";
import { CommentData } from "../../model/CommentData";
import ListItem from "@mui/material/ListItem";
import { Box, ListItemAvatar, Typography } from "@mui/material";
import UserAvatar from "../users/UserAvatar";
import ListItemText from "@mui/material/ListItemText";
import { calculateTimeDifference } from "../../utils/Utils";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { selectLanguage } from "../../slices/languageSlice";
import Divider from "@mui/material/Divider";

interface CommentProps {
  comment: CommentData;
  showDivider?: boolean;
}
const Comment: React.FC<CommentProps> = ({ comment, showDivider = true }) => {
  const languageSelector = useAppSelector(selectLanguage);
  return (
    <Box>
      <Box pb={2}>
        <ListItem sx={{ paddingLeft: 0 }}>
          <ListItemAvatar>
            <UserAvatar
              firstName={comment.author.firstName}
              lastName={comment.author.lastName}
            />
          </ListItemAvatar>
          <ListItemText
            primary={`${comment.author.firstName} ${comment.author.lastName}`}
            secondary={`${calculateTimeDifference(
              comment.date,
              languageSelector.language
            )}`}
          />
        </ListItem>
        <Typography variant={"body1"}>{comment.content}</Typography>
      </Box>
      {showDivider && <Divider />}
    </Box>
  );
};

export default Comment;
