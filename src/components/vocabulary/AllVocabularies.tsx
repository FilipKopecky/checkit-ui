import React from "react";
import { useGetAllVocabulariesQuery } from "../../api/apiSlice";
import { Components, Virtuoso } from "react-virtuoso";
import ListItem from "@mui/material/ListItem";
import MuiList from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Paper } from "@mui/material";
import Divider from "@mui/material/Divider";
const AllVocabularies: React.FC = () => {
  const { data, isLoading } = useGetAllVocabulariesQuery();

  if (isLoading) return <>Loading...</>;
  if (!data) return <>Fail</>;

  const InnerItem = React.memo(({ index, vocabularyLabel }: any) => {
    return (
      <>
        <ListItem
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => console.log(`Clicked on index: ${index}`)}
            >
              <PersonAddAltIcon />
            </IconButton>
          }
        >
          <ListItemText primary={vocabularyLabel} />
        </ListItem>
        <Divider />
      </>
    );
  });

  const itemContent = (index: any, vocabulary: any) => {
    return <InnerItem index={index} vocabularyLabel={vocabulary.label} />;
  };

  return (
    <Paper>
      <Virtuoso
        style={{ height: 400 }}
        components={{ List }}
        data={data}
        itemContent={itemContent}
      />
    </Paper>
  );
};

const List: Components["List"] = React.forwardRef(
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

export default AllVocabularies;
