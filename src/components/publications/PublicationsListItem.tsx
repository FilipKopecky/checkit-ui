import React from "react";
import { Publication } from "../../model/Publication";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {
  Box,
  LinearProgress,
  ListItemSecondaryAction,
  Tooltip,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";

interface PublicationsListItemProps {
  publication: Publication;
  index: number;
}

const PublicationsListItem: React.FC<PublicationsListItemProps> = ({
  publication,
  index,
}) => {
  const intl = useIntl();
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box pb={1}>
            <Typography variant="caption" color="text.secondary">
              {intl.formatMessage(
                { id: "publication-progress" },
                { progress: publication.progress }
              )}
            </Typography>

            <Box width={150}>
              <LinearProgress
                variant={"determinate"}
                value={publication.progress}
                color={"success"}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <ListItemSecondaryAction>
        <Link to={publication.id}>
          <Tooltip
            title={intl.formatMessage({ id: "seePublicationSummary" })}
            placement={"left"}
          >
            <span>
              <IconButton>
                <ContentPasteSearchOutlinedIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Link>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default PublicationsListItem;
