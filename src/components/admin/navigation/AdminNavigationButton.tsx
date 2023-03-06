import React from "react";
import { Box, Card, CardActionArea, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/ReduxHooks";
import { changeTab, selectAdminPanel } from "../../../slices/adminPanelSlice";
import { styled } from "@mui/material/styles";

interface AdminNavigationButtonProps {
  id: string;
  icon: any;
  altIconText: string;
  header: string;
  count: string;
  outOf?: string;
}

const AdminNavigationButton: React.FC<AdminNavigationButtonProps> = ({
  id,
  icon,
  altIconText,
  header,
  count,
  outOf,
}) => {
  const dispatch = useAppDispatch();
  const adminPanelSelector = useAppSelector(selectAdminPanel);
  return (
    <Card
      sx={{ marginRight: 2 }}
      elevation={adminPanelSelector.activeTab === id ? 7 : 1}
    >
      <CardActionArea onClick={() => dispatch(changeTab(id))}>
        <TextWrapper mr={2} p={2} sx={{ position: "relative" }}>
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
          <ImageWrapper>
            <img
              src={icon}
              alt={altIconText}
              style={{ position: "absolute", right: "0px", bottom: "0px" }}
            />
          </ImageWrapper>
        </TextWrapper>
      </CardActionArea>
    </Card>
  );
};

const ImageWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const TextWrapper = styled(Box)(({ theme }) => ({
  width: 280,
  height: 120,
  [theme.breakpoints.down("md")]: {
    width: "auto",
  },
}));

export default AdminNavigationButton;
