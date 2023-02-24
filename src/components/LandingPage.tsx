import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import heroImage from "../assets/data-processing.svg";

const LandingPage: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.light",
        color: "primary.contrastText",
        height: "100vh",
        padding: 3,
      }}
    >
      <Box display={"inline-block"}>
        <Typography variant={"h4"}>CheckIt</Typography>
        <Box width={"70%"} height={"4px"} bgcolor={"primary.contrastText"} />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <Box display={"flex"}>
          <Box flex={1} position={"relative"} mt={4}>
            <Typography variant={"h2"} gutterBottom>
              Collaborate and publish data
            </Typography>
            <Typography variant={"h5"}>Place to compare RDF</Typography>

            <Box sx={{ position: "absolute", bottom: 0, width: "70%" }}>
              <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  fullWidth
                  size={"large"}
                >
                  Login
                </Button>
              </Link>
            </Box>
          </Box>

          <Box flex={1}>
            <img
              src={heroImage}
              alt={"Computer consuming data"}
              width={486}
              height={347}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
