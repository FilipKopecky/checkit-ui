import React from "react";
import { Virtuoso } from "react-virtuoso";
import List from "../misc/VirtuosoMuiList";
import EmptyPlaceholder from "../misc/VirtuosoEmptyPlaceholder";
import { Publication } from "../../model/Publication";
import { UserData } from "../../model/User";
import { Vocabulary } from "../../model/Vocabulary";
import PublicationsListItem from "./PublicationsListItem";

const mockedUser: UserData = {
  firstName: "User",
  id: "6e9d19be-b8b3-451d-8d0b-8e987dd797b4",
  lastName: "Hugo",
};
const mockedVocabulary: Vocabulary = {
  gestors: [mockedUser],
  label:
    "COUNCIL DIRECTIVE 1999/37/EC on the registration documents for vehicles",
  uri: "https://slovník.gov.cz/generický/eu-directive-1999-37-ec",
};

const mockedPublication1: Publication = {
  affectedVocabularies: [mockedVocabulary],
  id: "randomId",
  label:
    "COUNCIL DIRECTIVE 1999/37/EC on the registration documents for vehicles",
  projectUri: "randomURI",
  state: "IN_PROGRESS",
  progress: 70,
  uri: "sadsadfsa",
};

const mockedPublication2: Publication = {
  affectedVocabularies: [mockedVocabulary],
  id: "randomId",
  label:
    "REGULATION (EU) 2018/858 OF THE EUROPEAN PARLIAMENT AND OF THE COUNCIL on the approval and market surveillance of motor vehicles and their trailers, and of systems, components and separate technical units intended for such vehicles",
  projectUri: "randomURI",
  state: "IN_PROGRESS",
  progress: 30,
  uri: "sadsadfsa",
};

const mockedPublication3: Publication = {
  affectedVocabularies: [mockedVocabulary],
  id: "randomId",
  label:
    "Datový slovník Poslanecké sněmovny Parlamentu České republiky - slovník",
  projectUri: "randomURI",
  state: "IN_PROGRESS",
  progress: 90,
  uri: "sadsadfsa",
};

const mockedPublications: Publication[] = [
  mockedPublication1,
  mockedPublication2,
  mockedPublication3,
];
const PublicationsList: React.FC = () => {
  const itemContent = (index: any, publication: any) => {
    return <InnerItem publication={publication} index={index} />;
  };

  return (
    <Virtuoso
      style={{ height: 400 }}
      components={{ List, EmptyPlaceholder: EmptyPlaceholder }}
      data={mockedPublications}
      itemContent={itemContent}
    />
  );
};

const InnerItem = React.memo(
  ({ publication, index }: any) => {
    return <PublicationsListItem publication={publication} index={index} />;
  },
  (prevProps, nextProps) => {
    return prevProps.id === nextProps.id;
  }
);

export default PublicationsList;
