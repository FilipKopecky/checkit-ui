import React from "react";
import { Typography } from "@mui/material";
import { useAuth } from "./auth/hooks";

const Home: React.FC = () => {
  const auth_data = useAuth();
  console.log(auth_data);
  return <Typography paragraph>Home page</Typography>;
};

export default Home;
