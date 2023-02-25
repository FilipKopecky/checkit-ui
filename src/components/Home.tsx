import React from "react";
import { Button, Typography } from "@mui/material";
import { useAuth } from "./auth/hooks";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/ReduxHooks";
import { changeLanguage } from "../slices/languageSlice";
import Constants from "../utils/Constants";
import { useIntl } from "react-intl";

const Home: React.FC = () => {
  const auth_data = useAuth();
  const dispatch = useAppDispatch();
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
      <Button onClick={() => dispatch(changeLanguage(Constants.LOCALES.CS))}>
        Swicth to czech
      </Button>
      <Button onClick={() => dispatch(changeLanguage(Constants.LOCALES.EN))}>
        Switch to english
      </Button>
      <nav>
        <Link to="/">Landing page</Link>
        <Link to="/adminOnly">Admin</Link>
      </nav>
    </Box>
  );
};

export default Home;
