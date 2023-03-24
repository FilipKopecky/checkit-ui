import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useIntl } from "react-intl";
import HomeNavigationButtons from "./misc/HomeNavigationButtons";
import ChangeDetail from "./change/ChangeDetail";
import { Change } from "../model/Change";

const mockedChange: Change = {
  comments: [],
  id: "randomID",
  newObject:
    "Budova je nadzemní stavba včetně její podzemní části prostorově soustředěná a navenek převážně uzavřená obvodovými stěnami a střešní konstrukcí.",
  object: "",
  predicate: "https://www.w3.org/2009/08/skos-reference/skos.html#definition",
  state: "",
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
      <ChangeDetail change={mockedChange} />
    </Box>
  );
};

export default Home;
