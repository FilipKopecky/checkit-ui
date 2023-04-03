import React from "react";
import { PublicationContext } from "../../model/Publication";
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
import GestoredBadge from "../chips/GestoredBadge";

interface PublicationsListItemProps {
  publication: PublicationContext;
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box display={"flex"} gap={2} sx={{ alignItems: "center" }}>
            {publication.reviewable && (
              <GestoredBadge
                label={intl.formatMessage({
                  id: "contains-gestored-vocabulary",
                })}
              />
            )}
            <Box width={150} pb={1}>
              <Typography variant="caption" color="text.secondary">
                {intl.formatMessage(
                  { id: "publication-progress" },
                  { progress: 30 }
                )}
              </Typography>
              <LinearProgress
                variant={"determinate"}
                value={30}
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
