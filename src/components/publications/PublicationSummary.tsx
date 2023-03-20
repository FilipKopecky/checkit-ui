import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Vocabulary } from "../../model/Vocabulary";
import { UserData } from "../../model/User";
import { Publication } from "../../model/Publication";
import PublicationHeader from "./PublicationHeader";
import VocabulariesList from "../vocabulary/VocabulariesList";
import IslandHeader from "../misc/IslandHeader";
import { useIntl } from "react-intl";
import PublicationStatistics from "./PublicationStatistics";

const Item = styled(Paper)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  textAlign: "center",
  height: "100%",
  fontSize: theme.typography.h5.fontSize,
}));

const PublicationSummary: React.FC = () => {
  const intl = useIntl();
  const mockedUser: UserData = {
    firstName: "User",
    id: "6e9d19be-b8b3-451d-8d0b-8e987dd797b4",
    lastName: "Hugo",
  };
  const mockedVocabulary: Vocabulary = {
    gestors: [mockedUser],
    label:
      "COUNCIL DIRECTIVE 1999/37/EC on the registration documents for vehicles",
    uri: "https://slovník.gov.cz/generický/eu-directive-1999-37-ec",
  };

  const mockedPublication: Publication = {
    affectedVocabularies: [mockedVocabulary],
    id: "randomId",
    label:
      "COUNCIL DIRECTIVE 1999/37/EC on the registration documents for vehicles",
    projectUri: "randomURI",
    state: "IN_PROGRESS",
    uri: "sadsadfsa",
  };
  return (
    <Box p={2} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <PublicationHeader
            label={mockedPublication.label}
            state={mockedPublication.state}
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <Paper>
            <IslandHeader
              header={intl.formatMessage({ id: "assignedVocabulariesHeader" })}
            />
            <Box px={3}>
              <VocabulariesList
                vocabularies={mockedPublication.affectedVocabularies}
                gestorsClick={() => console.log("done")}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid container item md={4} spacing={2} xs={12}>
          <Grid item md={12} sm={6} xs={12}>
            <Item>
              <PublicationStatistics />
            </Item>
          </Grid>
          <Grid item md={12} sm={6} xs={12}>
            <Item>
              <Typography>Random text</Typography>
              <Typography>Random text</Typography>
              <Typography>Random text</Typography>
              <Typography>Random text</Typography>
              <Typography>Random text</Typography>
              <Typography>Random text</Typography>
              <Typography>Random text</Typography>
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublicationSummary;
