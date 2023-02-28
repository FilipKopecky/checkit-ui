import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

interface SideBarLinkProps {
  open: boolean;
  label: string;
  icon: React.ReactNode;
  route: string;
}

const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(
  itemProps,
  ref
) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

const SideBarLink: React.FC<SideBarLinkProps> = ({
  open,
  label,
  icon,
  route,
}) => {
  return (
    <ListItem
      key={label}
      disablePadding
      sx={{ display: "block" }}
      component={Link}
      to={route}
    >
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};

export default SideBarLink;
