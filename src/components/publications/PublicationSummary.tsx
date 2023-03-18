import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const PublicationSummary: React.FC = () => {
  // const mockedUser: UserData = {
  //   firstName: "User",
  //   id: "6e9d19be-b8b3-451d-8d0b-8e987dd797b4",
  //   lastName: "Hugo",
  // };
  // const mockedVocabulary: Vocabulary = {
  //   gestors: [mockedUser],
  //   label:
  //     "COUNCIL DIRECTIVE 1999/37/EC on the registration documents for vehicles",
  //   uri: "https://slovník.gov.cz/generický/eu-directive-1999-37-ec",
  // };
  //
  // const mockedPublication: Publication = {
  //   affectedVocabularies: [mockedVocabulary],
  //   id: "randomId",
  //   label:
  //     "COUNCIL DIRECTIVE 1999/37/EC on the registration documents for vehicles",
  //   projectUri: "randomURI",
  //   state: "IN PROGRESS",
  //   uri: "sadsadfsa",
  // };
  // console.log(mockedPublication);
  return (
    <Box p={2} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Item>Project description</Item>
        </Grid>
        <Grid item md={8} xs={12}>
          <Item>Vocabularies</Item>
        </Grid>
        <Grid container item md={4} spacing={2} xs={12}>
          <Grid item md={12} sm={6} xs={12}>
            <Item>stats</Item>
          </Grid>
          <Grid item md={12} sm={6} xs={12}>
            <Item>comments</Item>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublicationSummary;
