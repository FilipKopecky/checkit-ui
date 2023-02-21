import React from "react";
import { Typography } from "@mui/material";
import { useAuth } from "./auth/hooks";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const auth_data = useAuth();
  return (
    <Box>
      <Typography variant={"h1"}>Welcome to CheckIT</Typography>
      <Typography variant={"h2"}>
        {auth_data.user.profile.preferred_username}
      </Typography>
      <ul>
        {auth_data.roles.map((role) => (
          <li>{role}</li>
        ))}
      </ul>
      <nav>
        <Link to="/">Landing page</Link>
        <Link to="/adminOnly">Admin</Link>
      </nav>
    </Box>
  );
};

export default Home;
