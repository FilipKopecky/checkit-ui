import React, { useMemo } from "react";
import { GroupedVirtuoso } from "react-virtuoso";
import { Change } from "../../model/Change";
import ChangeListItem from "./ChangeListItem";
import ChangeGroupHeader from "./ChangeGroupHeader";
import { Box, Paper } from "@mui/material";

interface ChangeListProps {
  changes: Change[];
}
const mockedUris = [
  "http://onto.fel.cvut.cz/ontologies/slovnik/decree-no-268-2009/pojem/building",
  "http://onto.fel.cvut.cz/ontologies/slovnik/decree-no-268-2009/pojem/stavba",
];
const ChangeList: React.FC<ChangeListProps> = ({ changes }) => {
  const groupCounts = useMemo(() => {
    return Array(2).fill(4);
  }, []);

  const itemContent = (index: number, groupIndex: number) => {
    const change = changes[index];
    return <InnerItem change={change} />;
  };

  return (
    <Paper>
      <Box>
        <GroupedVirtuoso
          style={{ height: 600 }}
          groupCounts={groupCounts}
          groupContent={(index) => {
            return <ChangeGroupHeader type={"TERM"} uri={mockedUris[index]} />;
          }}
          itemContent={itemContent}
        />
      </Box>
    </Paper>
  );
};

const InnerItem = React.memo(({ change }: any) => {
  return <ChangeListItem change={change} />;
});

export default ChangeList;
