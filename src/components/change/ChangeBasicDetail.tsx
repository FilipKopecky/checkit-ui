import React from "react";
import { Change } from "../../model/Change";
import { Typography } from "@mui/material";
import { resolveChangeState } from "../../utils/ChangeUtils";

interface ChangeBasicDetailProps {
  change: Change;
}

const ChangeBasicDetail: React.FC<ChangeBasicDetailProps> = ({ change }) => {
  const state = resolveChangeState(change);
  return <Typography variant={"body1"}>{state}</Typography>;
};

export default ChangeBasicDetail;
