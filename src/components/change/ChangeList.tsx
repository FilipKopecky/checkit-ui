import React, { useMemo } from "react";
import { GroupedVirtuoso } from "react-virtuoso";
import { Change } from "../../model/Change";
import ChangeListItem from "./ChangeListItem";
import ChangeGroupHeader from "./ChangeGroupHeader";
import { Box } from "@mui/material";

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
    return <InnerItem change={change} index={index} />;
  };

  return (
    <Box>
      <GroupedVirtuoso
        style={{ height: 500 }}
        groupCounts={groupCounts}
        groupContent={(index) => {
          return <ChangeGroupHeader type={"TERM"} uri={mockedUris[index]} />;
        }}
        itemContent={itemContent}
      />
    </Box>
  );
};

const InnerItem = React.memo(({ change, index }: any) => {
  //TODO: pb is just for testing purpose, calculation is required for proper function
  return (
    <Box pb={index === 3 ? 5 : 0} px={2}>
      <ChangeListItem change={change} />
    </Box>
  );
});

export default ChangeList;
