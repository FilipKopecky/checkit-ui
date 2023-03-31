import React from "react";
import { GroupedVirtuoso } from "react-virtuoso";
import ChangeListItem from "./ChangeListItem";
import ChangeListItemGroup from "./ChangeListItemGroup";
import { Box } from "@mui/material";
import { ChangeListData } from "../publications/PublicationReviewVocabulary";

interface ChangeListProps {
  changeListData: ChangeListData;
}

const ChangeList: React.FC<ChangeListProps> = ({ changeListData }) => {
  const itemContent = (index: number, groupIndex: number) => {
    const change = changeListData.allChanges[index];
    return (
      <InnerItem
        change={change}
        index={index}
        groupIndex={groupIndex}
        triggers={changeListData.lastInGroupIndexes}
      />
    );
  };

  return (
    <Box>
      <GroupedVirtuoso
        style={{ height: 700 }}
        groupCounts={changeListData.groupCounts}
        groupContent={(index) => {
          return <ChangeListItemGroup uri={changeListData.headers[index]} />;
        }}
        itemContent={itemContent}
      />
    </Box>
  );
};

const InnerItem = React.memo(({ change, index, groupIndex, triggers }: any) => {
  return (
    <Box sx={{ pb: triggers[groupIndex] === index ? 5 : 0 }}>
      <ChangeListItem change={change} />
    </Box>
  );
});

export default ChangeList;
