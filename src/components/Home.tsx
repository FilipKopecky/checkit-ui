import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useIntl } from "react-intl";
import HomeNavigationButtons from "./misc/HomeNavigationButtons";

const Home: React.FC = () => {
  const intl = useIntl();

  return (
    <Box p={3}>
      <Typography variant={"h4"} gutterBottom>
        {intl.formatMessage({ id: "welcome" })}
      </Typography>
      <HomeNavigationButtons />
    </Box>
  );
};

export default Home;
