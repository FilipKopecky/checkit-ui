import React from "react";
import { Typography } from "@mui/material";
import { useAuth } from "./auth/hooks";
import Box from "@mui/material/Box";
import { useIntl } from "react-intl";

const Home: React.FC = () => {
  const auth_data = useAuth();
  const intl = useIntl();
  return (
    <Box>
      <Typography variant={"h1"}>
        {intl.formatMessage({ id: "welcome" })}
      </Typography>
      <Typography variant={"h2"}>
        {auth_data.user.profile.preferred_username}
      </Typography>
      <ul>
        {auth_data.roles.map((role) => (
          <li key={role}>{role}</li>
        ))}
      </ul>
    </Box>
  );
};

export default Home;
