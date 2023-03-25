import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useIntl } from "react-intl";
import HomeNavigationButtons from "./misc/HomeNavigationButtons";
import ChangeListItem from "./change/ChangeListItem";
import { Change } from "../model/Change";
import ChangeGroupHeader from "./change/ChangeGroupHeader";

const mockedChange: Change = {
  comments: [],
  id: "randomID",
  object:
    "Budova je nadzemní stavba včetně její podzemní části prostorově soustředěná a navenek převážně uzavřená obvodovými stěnami a střešní konstrukcí.",
  //newObject: "Budova je nadzemní stavba včetně její podzemní části.",
  predicate: "http://www.w3.org/2004/02/skos/core#definition",
  state: "DELETED",
  subject:
    "http://onto.fel.cvut.cz/ontologies/slovnik/decree-no-268-2009/pojem/building",
  type: "TERM",
  uri: "changeURI",
};

const Home: React.FC = () => {
  const intl = useIntl();
  return (
    <Box p={3}>
      <Typography variant={"h4"} gutterBottom>
        {intl.formatMessage({ id: "welcome" })}
      </Typography>
      <HomeNavigationButtons />
      <ChangeGroupHeader
        type={"TERM"}
        uri={
          "http://onto.fel.cvut.cz/ontologies/slovnik/decree-no-268-2009/pojem/building"
        }
      />
      <ChangeListItem change={mockedChange} />
    </Box>
  );
};

export default Home;
