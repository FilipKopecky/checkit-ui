import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import PublicationHeader from "./PublicationHeader";
import VocabulariesList from "../vocabulary/VocabulariesList";
import IslandHeader from "../misc/IslandHeader";
import { useIntl } from "react-intl";
import PublicationNotifications from "./PublicationNotifications";
import PublicationStatistics from "./PublicationStatistics";
import { useNavigate, useParams } from "react-router-dom";
import ContentPasteGoOutlinedIcon from "@mui/icons-material/ContentPasteGoOutlined";
import { useGetPublicationByIdQuery } from "../../api/publicationApi";

const Item = styled(Paper)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(3),
  height: "100%",
  fontSize: theme.typography.h5.fontSize,
}));

const PublicationSummary: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { publicationId } = useParams();
  const { data: publication } = useGetPublicationByIdQuery(publicationId || "");
  //TODO: add loader and error messages
  if (!publication) return <></>;
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <PublicationHeader
            label={publication.label}
            state={publication.state}
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <Paper sx={{ height: "100%" }}>
            <IslandHeader
              header={intl.formatMessage({ id: "assignedVocabulariesHeader" })}
            />
            <Box px={3}>
              <VocabulariesList
                vocabularies={publication.affectedVocabularies}
                actionIcon={<ContentPasteGoOutlinedIcon />}
                action={() => navigate("vocabulary")}
                actionDescription={intl.formatMessage({
                  id: "startVocabularyReviewAction",
                })}
                gestorsClick={() => {}}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid container item md={4} spacing={2} xs={12}>
          <Grid item md={12} sm={6} xs={12}>
            <PublicationStatistics />
          </Grid>
          <Grid item md={12} sm={6} xs={12}>
            <Item>
              <IslandHeader header={"Notifikace"} />
              <PublicationNotifications />
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublicationSummary;
