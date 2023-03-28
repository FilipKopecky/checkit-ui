import React from "react";
import ChangeList from "../change/ChangeList";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetVocabularyChangesQuery } from "../../api/publicationApi";

const PublicationReviewVocabulary: React.FC = () => {
  const { publicationId } = useParams();
  const [searchParams] = useSearchParams();
  const uri = searchParams.get("vocabularyUri");

  const { data: vocabularyChanges } = useGetVocabularyChangesQuery({
    vocabularyUri: uri!,
    publicationId: publicationId!,
  });

  if (!vocabularyChanges) return <></>;

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Paper>
            <Box p={3}>
              <Typography variant={"h6"}>{vocabularyChanges.label}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item md={12} xs={12}>
          <ChangeList changes={vocabularyChanges.changes} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublicationReviewVocabulary;
