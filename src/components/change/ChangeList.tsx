import React, { useMemo } from "react";
import { GroupedVirtuoso } from "react-virtuoso";
import { Change } from "../../model/Change";
import ChangeListItem from "./ChangeListItem";
import ChangeListItemGroup from "./ChangeListItemGroup";
import { Box } from "@mui/material";

interface ChangeListProps {
  changes: Change[];
}

const ChangeList: React.FC<ChangeListProps> = ({ changes }) => {
  const changesInfo = useMemo(() => {
    let allChanges = [];
    let headers = [];
    let groupCounts = [];
    let paddedIndex: number[] = [];

    const grouped = changes.reduce<{
      [key: string]: Change[];
    }>(function (r, a) {
      r[a.subject] = r[a.subject] || [];
      r[a.subject].push(a);
      return r;
    }, Object.create(null));

    for (const [, value] of Object.entries(grouped)) {
      const header = value[0].subject;
      headers.push(header);
      allChanges.push(...value);
      groupCounts.push(value.length);
      if (paddedIndex.length === 0) {
        paddedIndex.push(value.length - 1);
      } else {
        paddedIndex.push(paddedIndex[paddedIndex.length - 1] + value.length);
      }
    }

    return {
      changes: allChanges,
      headerUris: headers,
      counts: groupCounts,
      paddedIndex: paddedIndex,
    };
  }, [changes]);
  const itemContent = (index: number, groupIndex: number) => {
    const change = changesInfo.changes[index];
    return (
      <InnerItem
        change={change}
        index={index}
        groupIndex={groupIndex}
        triggers={changesInfo.paddedIndex}
      />
    );
  };

  return (
    <Box>
      <GroupedVirtuoso
        style={{ height: 700 }}
        groupCounts={changesInfo.counts}
        groupContent={(index) => {
          return (
            <ChangeListItemGroup
              type={"TERM"}
              uri={changesInfo.headerUris[index]}
            />
          );
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
