import React from "react";
import { Publication } from "../../model/Publication";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {
  Box,
  LinearProgress,
  ListItemSecondaryAction,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import { Link } from "react-router-dom";

interface PublicationsListItemProps {
  publication: Publication;
  index: number;
}

const PublicationsListItem: React.FC<PublicationsListItemProps> = ({
  publication,
  index,
}) => {
  return (
    <ListItem
      sx={{
        backgroundColor:
          index % 2 === 0 ? "background.default" : "background.paper",
      }}
    >
      <Box
        sx={{
          justifyContent: "space-between",
          display: "flex",
          flex: 1,
        }}
        pr={1}
      >
        <ListItemText primary={publication.label} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box width={100}>
            <LinearProgress
              variant={"determinate"}
              value={publication.progress}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            publication.progress
          )}%`}</Typography>
        </Box>
      </Box>
      <ListItemSecondaryAction>
        <Link to={publication.id}>
          <IconButton>
            <ContentPasteSearchOutlinedIcon />
          </IconButton>
        </Link>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default PublicationsListItem;
