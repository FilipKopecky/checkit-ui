import React from "react";
import { Change } from "../model/Change";
import ChangeList from "./change/ChangeList";
import IslandHeader from "./misc/IslandHeader";
import { Box, Grid, Paper, Typography } from "@mui/material";

const mockedChange: Change = {
  comments: [],
  id: "randomID",
  object:
    "Budova je nadzemní stavba včetně její podzemní části prostorově soustředěná a navenek převážně uzavřená obvodovými stěnami a střešní konstrukcí.",
  newObject: "Budova je nadzemní stavba včetně její podzemní části.",
  predicate: "http://www.w3.org/2004/02/skos/core#definition",
  state: "MODIFIED",
  subject:
    "http://onto.fel.cvut.cz/ontologies/slovnik/decree-no-268-2009/pojem/building",
  type: "TERM",
  uri: "changeURI",
};

const mockedChange2: Change = {
  comments: [],
  id: "randomID",
  object: "Stavení",
  predicate: "http://www.w3.org/2004/02/skos/core#prefLabel",
  state: "CREATED",
  subject:
    "http://onto.fel.cvut.cz/ontologies/slovnik/decree-no-268-2009/pojem/building",
  type: "TERM",
  uri: "changeURI",
};

const mockedChange3: Change = {
  comments: [],
  id: "randomID",
  object:
    "Veškerá stavební díla, která vznikají stavební nebo montážní technologií, bez zřetele na jejich stavebně technické provedení, použité stavební výrobky, materiály a konstrukce, na účel využití a dobu trvání. Dočasná stavba je stavba, u které stavební úřad předem omezí dobu jejího trvání.",
  predicate: "http://www.w3.org/2004/02/skos/core#definition",
  state: "DELETED",
  subject:
    "http://onto.fel.cvut.cz/ontologies/slovnik/decree-no-268-2009/pojem/stavba",
  type: "TERM",
  uri: "changeURI",
};
const mockedChange4: Change = {
  comments: [],
  id: "randomID",
  object:
    "Veškerá stavební díla, která vznikají stavební nebo montážní technologií, bez zřetele na jejich stavebně technické provedení, použité stavební výrobky, materiály a konstrukce, na účel využití a dobu trvání. Dočasná stavba je stavba, u které stavební úřad předem omezí dobu jejího trvání.",
  predicate: "http://www.w3.org/2004/02/skos/core#scopeNote",
  state: "CREATED",
  subject:
    "http://onto.fel.cvut.cz/ontologies/slovnik/decree-no-268-2009/pojem/stavba",
  type: "TERM",
  uri: "changeURI",
};

const PublicationVocabulary: React.FC = () => {
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Paper>
            <Box p={3}>
              <Typography variant={"h4"}>
                COUNCIL DIRECTIVE 1999/37/EC on the registration documents for
                vehicles
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item md={12} xs={12}>
          <Box>
            <Paper>
              <IslandHeader header={"Změny ve slovníku"} />
              <ChangeList
                changes={[
                  mockedChange,
                  mockedChange2,
                  mockedChange3,
                  mockedChange4,
                  mockedChange,
                  mockedChange2,
                  mockedChange3,
                  mockedChange4,
                ]}
              />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublicationVocabulary;
