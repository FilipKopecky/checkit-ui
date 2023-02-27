import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import heroImage from "../assets/data-processing.svg";
import { styled } from "@mui/material/styles";
import { useIntl } from "react-intl";

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
          marginTop: 12,
        }}
      >
        <Box display={"flex"}>
          <HeroText />
          <HeroImage />
        </Box>
      </Box>
    </Box>
  );
};

const HeroText: React.FC = () => {
  const intl = useIntl();
  return (
    <Box
      flex={1}
      flexDirection={"column"}
      display={"flex"}
      position={"relative"}
      mt={4}
    >
      <Typography variant={"h2"} gutterBottom>
        {intl.formatMessage({ id: "hero-text-main" })}
      </Typography>
      <Typography variant={"h5"} gutterBottom>
        {intl.formatMessage({ id: "hero-text-secondary" })}
      </Typography>

      <Box sx={{ width: "70%", marginTop: "auto" }}>
        <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
          <Button
            variant={"contained"}
            color={"secondary"}
            fullWidth
            size={"large"}
          >
            {intl.formatMessage({ id: "login" })}
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

const HideBox = styled(Box)(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const HeroImage: React.FC = () => {
  return (
    <HideBox>
      <img
        src={heroImage}
        alt={"Computer consuming data"}
        width={486}
        height={347}
        style={{ display: "block", marginLeft: "auto" }}
      />
    </HideBox>
  );
};

export default LandingPage;
