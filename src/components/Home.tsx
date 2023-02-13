import React from "react";
import { Typography } from "@mui/material";
import { useAuth } from "./auth/hooks";

const Home: React.FC = () => {
  const user = useAuth();
  console.log(user);
  return <Typography paragraph>Home page</Typography>;
};

export default Home;
