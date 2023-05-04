import React from "react";
import { useGetClosedPublicationsQuery } from "../../api/publicationApi";
import LoadingOverlay from "../misc/LoadingOverlay";
import ErrorAlert from "../misc/ErrorAlert";
import PublicationsList from "./PublicationsList";

const ClosedPublications: React.FC = () => {
  const {
    data: closedPublications,
    isLoading,
    error,
  } = useGetClosedPublicationsQuery({
    pageNumber: 0,
  });

  if (isLoading) return <LoadingOverlay />;
  if (error || !closedPublications) return <ErrorAlert />;

  return <PublicationsList publications={closedPublications} />;
};

export default ClosedPublications;
