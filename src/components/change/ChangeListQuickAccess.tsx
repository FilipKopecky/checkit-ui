import React from "react";
import { ChangeListData } from "../publications/PublicationReviewVocabulary";
import { Change } from "../../model/Change";
import { Box } from "@mui/material";
import { Virtuoso } from "react-virtuoso";
import EmptyPlaceholder from "../misc/VirtuosoEmptyPlaceholder";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import MappedLabel from "./MappedLabel";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { scrollInChangeList } from "../../slices/eventSlice";

interface ChangeListQuickAccessProps {
  changeListData: ChangeListData;
}

const ChangeListQuickAccess: React.FC<ChangeListQuickAccessProps> = ({
  changeListData,
}) => {
  const components = createList(changeListData.allChanges);
  const itemContent = (index: any, change: any) => {
    return <InnerItem index={index} change={change} />;
  };

  return (
    <Box>
      <div>Quick Access</div>
      <Virtuoso
        data={components}
        style={{ height: 400 }}
        itemContent={itemContent}
        components={{ EmptyPlaceholder: EmptyPlaceholder }}
      />
    </Box>
  );
};

const createList = (changes: Change[]) => {
  let listItems = [];
  let previousSubject;
  for (let i = 0; i < changes.length; i++) {
    const change = changes[i];
    if (previousSubject !== change.subject) {
      //Header
      listItems.push({ uri: "", index: i, label: change.label });
    }
    //Change
    listItems.push({ uri: change.predicate, index: i, label: "" });
    previousSubject = change.subject;
  }
  return listItems;
};

const InnerItem = React.memo(({ change, index }: any) => {
  const dispatch = useAppDispatch();
  if (change.label) {
    return (
      <ListItem sx={{ padding: 0 }}>
        <ListItemText
          onClick={() =>
            dispatch(
              scrollInChangeList({ date: Date.now(), index: change.index })
            )
          }
        >
          {change.label}
        </ListItemText>
      </ListItem>
    );
  } else {
    return (
      <ListItem sx={{ paddingLeft: 1 }}>
        <ListItemText
          onClick={() =>
            dispatch(
              scrollInChangeList({ date: Date.now(), index: change.index })
            )
          }
        >
          <MappedLabel uri={change.uri} />
        </ListItemText>
      </ListItem>
    );
  }
});

export default ChangeListQuickAccess;
