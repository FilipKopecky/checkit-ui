import React, { useEffect, useRef } from "react";
import { GroupedVirtuoso, VirtuosoHandle } from "react-virtuoso";
import ChangeListItem from "./ChangeListItem";
import ChangeListItemGroup from "./ChangeListItemGroup";
import { Box } from "@mui/material";
import { ChangeListData } from "../publications/PublicationReviewVocabulary";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { selectEvent } from "../../slices/eventSlice";

interface ChangeListProps {
  changeListData: ChangeListData;
}

const ChangeList: React.FC<ChangeListProps> = ({ changeListData }) => {
  const virtuoso = useRef<VirtuosoHandle>(null);
  const eventSelector = useAppSelector(selectEvent);
  const handleSmoothScroll = (index: number) => {
    virtuoso.current?.scrollToIndex({
      index: index,
      align: "start",
      behavior: "smooth",
    });
  };

  useEffect(() => {
    handleSmoothScroll(eventSelector.changeScrollIndex);
  }, [eventSelector]);
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
  const startIndex = changeListData.allChanges.findIndex(
    (change) => change.state === "NOT_REVIEWED"
  );
  return (
    <Box>
      <GroupedVirtuoso
        ref={virtuoso}
        style={{ height: 700 }}
        initialTopMostItemIndex={startIndex === -1 ? 0 : startIndex}
        groupCounts={changeListData.groupCounts}
        groupContent={(index) => {
          return <ChangeListItemGroup data={changeListData.headers[index]} />;
        }}
        itemContent={itemContent}
      />
    </Box>
  );
};

const InnerItem = React.memo(({ change, index, groupIndex, triggers }: any) => {
  return (
    <Box sx={{ pb: triggers[groupIndex] === index ? 5 : 0 }} pl={2} pr={2}>
      <ChangeListItem change={change} />
    </Box>
  );
});

export default ChangeList;
