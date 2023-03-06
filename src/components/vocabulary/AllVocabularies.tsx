import React, { forwardRef, ReactNode } from "react";
import { useGetAllVocabulariesQuery } from "../../api/apiSlice";
import { Virtuoso } from "react-virtuoso";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
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
        // @ts-ignore
        components={MUIComponents}
        data={data}
        itemContent={itemContent}
      />
    </Paper>
  );
};

interface MUIComponentsProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

interface ListProps extends MUIComponentsProps {
  listRef: React.RefObject<HTMLDivElement>;
}

interface MUIComponentsType {
  List: React.ForwardRefExoticComponent<
    ListProps & React.RefAttributes<HTMLDivElement>
  >;
}

const MUIComponents: MUIComponentsType = {
  List: forwardRef<HTMLDivElement, ListProps>(({ style, children }, ref) => {
    return (
      <List
        style={{ padding: 0, ...style, margin: 0 }}
        component="div"
        ref={ref}
      >
        {children}
      </List>
    );
  }),
};

export default AllVocabularies;
