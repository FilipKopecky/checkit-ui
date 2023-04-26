import React from "react";
import { Virtuoso } from "react-virtuoso";
import List from "../misc/VirtuosoMuiList";
import EmptyPlaceholder from "../misc/VirtuosoEmptyPlaceholder";
import { PublicationContext } from "../../model/Publication";
import PublicationsListItem from "./PublicationsListItem";

interface PublicationsListProps {
  publications: PublicationContext[];
}

const PublicationsList: React.FC<PublicationsListProps> = ({
  publications,
}) => {
  const itemContent = (index: any, publication: any) => {
    return <InnerItem publication={publication} index={index} />;
  };

  return (
    <Virtuoso
      style={{ height: 400 }}
      components={{ List, EmptyPlaceholder: EmptyPlaceholder }}
      data={publications}
      itemContent={itemContent}
    />
  );
};

const InnerItem = React.memo(
  ({ publication, index }: any) => {
    return <PublicationsListItem publication={publication} index={index} />;
  },
  (prevProps, nextProps) => {
    return (
      prevProps.id === nextProps.id &&
      prevProps.publication.statistics === nextProps.publication.statistics
    );
  }
);

export default PublicationsList;
