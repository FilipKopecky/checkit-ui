import React from "react";
import { Typography } from "@mui/material";
import { useAuth } from "./auth/hooks";
import { getToken } from "./auth/utils";

const Home: React.FC = () => {
  const user = useAuth();
  const token = getToken();
  console.log(user);
  console.log(token);
  return <Typography paragraph>Home page</Typography>;
};

export default Home;
