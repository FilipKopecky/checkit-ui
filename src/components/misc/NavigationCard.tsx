import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

interface NavigationCardProps {
  header: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  route: string;
}

const NavigationCard: React.FC<NavigationCardProps> = ({
  header,
  description,
  icon,
  color,
  route,
}) => {
  return (
    <Box>
      <Card sx={{ maxWidth: 300 }} elevation={2}>
        <ClearLink to={route}>
          <CardActionArea disableRipple={true}>
            <CardMedia>
              <Box
                bgcolor={color}
                display={"flex"}
                sx={{ justifyContent: "center" }}
                p={2}
              >
                <Paper
                  square={false}
                  sx={{ display: "inline-block", borderRadius: "100px" }}
                  elevation={4}
                >
                  <Box
                    p={1}
                    color={color}
                    width={60}
                    height={60}
                    display={"flex"}
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    {icon}
                  </Box>
                </Paper>
              </Box>
            </CardMedia>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ textAlign: "center" }}
              >
                {header}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </ClearLink>
      </Card>
    </Box>
  );
};

const ClearLink = styled(Link)(() => ({
  textDecoration: "none",
  color: "inherit",
}));

export default NavigationCard;
