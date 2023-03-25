import React from "react";
import { Change } from "../../model/Change";
import { Typography } from "@mui/material";

interface ChangeBasicDetailProps {
  change: Change;
}

const ChangeBasicDetail: React.FC<ChangeBasicDetailProps> = ({ change }) => {
  return <Typography variant={"body1"}>{change.state}</Typography>;
};

export default ChangeBasicDetail;
