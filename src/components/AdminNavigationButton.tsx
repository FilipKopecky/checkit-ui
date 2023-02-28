import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

interface AdminNavigationButtonProps {
  icon: any;
  altIconText: string;
  header: string;
  count: string;
  outOf?: string;
  route: string;
}

const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(
  itemProps,
  ref
) {
  return (
    <RouterLink
      style={{ textDecoration: "none" }}
      ref={ref}
      {...itemProps}
      role={undefined}
    />
  );
});

const AdminNavigationButton: React.FC<AdminNavigationButtonProps> = ({
  icon,
  altIconText,
  header,
  count,
  outOf,
  route,
}) => {
  return (
    <Paper elevation={2} sx={{ marginRight: 2 }} component={Link} to={route}>
      <Box width={280} height={120} mr={2} p={2} sx={{ position: "relative" }}>
        <Typography variant={"h6"}>{header}</Typography>
        <Box display={"flex"}>
          <Typography variant={"h4"} sx={{ fontWeight: 600 }}>
            {count}
          </Typography>
          {outOf && (
            <Box sx={{ marginTop: "auto" }}>
              <Typography variant={"h5"} color={"gray"}>
                /{outOf}
              </Typography>
            </Box>
          )}
        </Box>
        <img
          src={icon}
          alt={altIconText}
          style={{ position: "absolute", right: "0px", bottom: "0px" }}
        />
      </Box>
    </Paper>
  );
};

export default AdminNavigationButton;
