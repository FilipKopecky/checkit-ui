import React from "react";
import { Outlet } from "react-router-dom";
import { Typography } from "@mui/material";

const Root: React.FC = () => {
  return (
    <div>
      <Typography variant={"body1"}>CheckIt</Typography>
      <Outlet />
    </div>
  );
};

export default Root;
