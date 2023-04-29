import React, { useMemo, useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import PublicationHeader from "./PublicationHeader";
import VocabulariesList from "../vocabulary/VocabulariesList";
import IslandHeader from "../misc/IslandHeader";
import { useIntl } from "react-intl";
import PublicationStatistics from "./PublicationStatistics";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import DifferenceOutlinedIcon from "@mui/icons-material/DifferenceOutlined";
import { useGetPublicationByIdQuery } from "../../api/publicationApi";
import { PublicationVocabularyData, Vocabulary } from "../../model/Vocabulary";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { selectUser } from "../../slices/userSlice";
import VocabularyGestorsModal from "../vocabulary/VocabularyGestorsModal";
import LoadingOverlay from "../misc/LoadingOverlay";
import ErrorAlert from "../misc/ErrorAlert";
import ReviewProgress from "./ReviewProgress";

const Item = styled(Paper)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(3),
  height: "100%",
  fontSize: theme.typography.h5.fontSize,
}));

const PublicationSummary: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { publicationId } = useParams();
  const currentUser = useAppSelector(selectUser);
  const [selectedVocabulary, setSelectedVocabulary] = useState<Vocabulary>();
  const [modalOpen, setModalOpen] = useState(false);
  const {
    data: publication,
    isLoading,
    error,
  } = useGetPublicationByIdQuery(publicationId || "", {
    refetchOnMountOrArgChange: true,
  });

  const containsGestored = useMemo(() => {
    return (
      publication?.affectedVocabularies.some((vocabulary) =>
        vocabulary.gestors.some((user) => user.id === currentUser.id)
      ) ?? false
    );
  }, [publication?.affectedVocabularies, currentUser.id]);

  if (isLoading) return <LoadingOverlay />;
  if (error || !publication) return <ErrorAlert />;

  const showAditional = (
    vocabulary: PublicationVocabularyData
  ): React.ReactNode => {
    return (
      <ReviewProgress
        gestored={vocabulary.gestored}
        statistics={vocabulary.statistics}
      />
    );
  };

  const handleGestorsClick = (vocabulary: Vocabulary) => {
    setSelectedVocabulary(vocabulary);
    setModalOpen(true);
  };

  return (
    <Box px={2}>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <PublicationHeader
            publication={publication}
            gestored={containsGestored}
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <Paper sx={{ height: "100%" }}>
            <IslandHeader
              header={intl.formatMessage({ id: "assignedVocabulariesHeader" })}
            />
            <Box px={3}>
              <VocabulariesList
                vocabularies={publication.affectedVocabularies}
                actionIcon={<DifferenceOutlinedIcon />}
                additionalInfo={showAditional}
                action={(vocabulary) =>
                  navigate({
                    pathname: "vocabulary",
                    search: createSearchParams({
                      vocabularyUri: vocabulary.uri,
                    }).toString(),
                  })
                }
                actionDescription={intl.formatMessage({
                  id: "startVocabularyReviewAction",
                })}
                gestorsClick={handleGestorsClick}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid container item md={4} spacing={2} xs={12}>
          <PublicationStatistics publication={publication} />
        </Grid>
      </Grid>
      <VocabularyGestorsModal
        open={modalOpen}
        setOpen={setModalOpen}
        vocabulary={selectedVocabulary}
      />
    </Box>
  );
};

export default PublicationSummary;
