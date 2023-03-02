import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useIntl } from "react-intl";

const Home: React.FC = () => {
  const intl = useIntl();
  return (
    <Box>
      <Typography variant={"h1"}>
        {intl.formatMessage({ id: "welcome" })}
      </Typography>
    </Box>
  );
};

export default Home;
