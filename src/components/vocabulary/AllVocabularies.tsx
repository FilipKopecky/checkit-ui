import React from "react";
import { useGetAllVocabulariesQuery } from "../../api/apiSlice";

const AllVocabularies: React.FC = () => {
  const { data, isLoading } = useGetAllVocabulariesQuery();
  if (isLoading) return <>Loading...</>;
  console.log(data);
  return <div>Loaded</div>;
};

export default AllVocabularies;
