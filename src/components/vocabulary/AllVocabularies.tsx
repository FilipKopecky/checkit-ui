import React, { useState } from "react";
import { useGetAllVocabulariesQuery } from "../../api/apiSlice";
import { Components, Virtuoso } from "react-virtuoso";
import ListItem from "@mui/material/ListItem";
import MuiList from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import AssignedVocabulariesModal from "../admin/AssignedVocabulariesModal";
const AllVocabularies: React.FC = () => {
  const { data, isLoading } = useGetAllVocabulariesQuery();
  const [open, setOpen] = useState(false);
  const [vocabularyUri, setVocabularyUri] = useState("");
  if (isLoading) return <>Loading...</>;
  if (!data) return <>Fail</>;

  const itemContent = (index: any, vocabulary: any) => {
    return (
      <InnerItem
        index={index}
        vocabulary={vocabulary}
        setOpen={setOpen}
        setVocabulary={setVocabularyUri}
      />
    );
  };

  return (
    <>
      <Virtuoso
        style={{ height: 400 }}
        components={{ List }}
        data={data}
        itemContent={itemContent}
      />
      <AssignedVocabulariesModal
        open={open}
        setOpen={setOpen}
        vocabularyUri={vocabularyUri}
      />
    </>
  );
};
const InnerItem = React.memo(
  ({ index, vocabulary, setOpen, setVocabulary }: any) => {
    return (
      <>
        <ListItem
          sx={{
            backgroundColor:
              index % 2 === 0 ? "background.default" : "background.paper",
          }}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => {
                setOpen(true);
                setVocabulary(vocabulary.uri);
              }}
            >
              <ManageAccountsOutlinedIcon />
            </IconButton>
          }
        >
          <ListItemText primary={vocabulary.label} />
        </ListItem>
      </>
    );
  }
);
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
