import { Components } from "react-virtuoso";
import React from "react";
import MuiList from "@mui/material/List";

const VirtuosoMuiList: Components["List"] = React.forwardRef(
  ({ style, children }, ref) => {
    return (
      <MuiList
        style={{ padding: 0, ...style, margin: 0 }}
        component="div"
        ref={ref}
      >
        {children}
      </MuiList>
    );
  }
);

export default VirtuosoMuiList;
