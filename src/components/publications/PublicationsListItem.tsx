import React from "react";
import { PublicationContext } from "../../model/Publication";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Box, ListItemSecondaryAction, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";
import ReviewProgress from "./ReviewProgress";

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
        <ListItemText
          primary={publication.label}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        />
        {publication.statistics && (
          <ReviewProgress
            gestored={publication.reviewable}
            statistics={publication.statistics}
          />
        )}
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
