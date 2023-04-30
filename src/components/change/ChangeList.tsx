import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { GroupedVirtuoso, VirtuosoHandle } from "react-virtuoso";
import ChangeListItem from "./ChangeListItem";
import ChangeListItemGroup from "./ChangeListItemGroup";
import { Box } from "@mui/material";
import { ChangeListData } from "../publications/PublicationReviewVocabulary";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { selectEvent } from "../../slices/eventSlice";
import { useSearchParams } from "react-router-dom";

interface ChangeListProps {
  changeListData: ChangeListData;
}

const ChangeList: React.FC<ChangeListProps> = ({ changeListData }) => {
  const [searchParams] = useSearchParams();
  const changeId = searchParams.get("changeId");
  const virtuoso = useRef<VirtuosoHandle>(null);
  const eventSelector = useAppSelector(selectEvent);
  const [startIndex] = useState(
    changeListData.allChanges.findIndex(
      (change) => change.state === "NOT_REVIEWED"
    )
  );
  const [passedChangeIndex] = useState(
    changeListData.allChanges.findIndex((change) => change.id === changeId)
  );
  const handleSmoothScroll = (index: number) => {
    virtuoso.current?.scrollToIndex({
      index: index,
      align: "start",
      behavior: "smooth",
    });
  };

  useLayoutEffect(() => {
    //Smoothly scrolls to latest unreviewed change or scrolls to change mentioned in the parameter
    let index = 0;
    if (passedChangeIndex !== -1) {
      index = passedChangeIndex;
    } else {
      index = startIndex === -1 ? 0 : startIndex;
    }
    new Promise((r) => setTimeout(r, 100)).then(() =>
      handleSmoothScroll(index)
    );
  }, [passedChangeIndex, startIndex]);

  useEffect(() => {
    if (eventSelector.changeScrollDate) {
      handleSmoothScroll(eventSelector.changeScrollIndex);
    }
  }, [eventSelector.changeScrollIndex, eventSelector.changeScrollDate]);
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
        ref={virtuoso}
        style={{ height: 700 }}
        // initialTopMostItemIndex={startIndex === -1 ? 0 : startIndex}
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
