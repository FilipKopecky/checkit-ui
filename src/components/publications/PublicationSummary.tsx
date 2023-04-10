import React, { useMemo, useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import PublicationHeader from "./PublicationHeader";
import VocabulariesList from "../vocabulary/VocabulariesList";
import IslandHeader from "../misc/IslandHeader";
import { useIntl } from "react-intl";
import PublicationNotifications from "./PublicationNotifications";
import PublicationStatistics from "./PublicationStatistics";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import ContentPasteGoOutlinedIcon from "@mui/icons-material/ContentPasteGoOutlined";
import { useGetPublicationByIdQuery } from "../../api/publicationApi";
import { Vocabulary } from "../../model/Vocabulary";
import GestoredBadge from "../chips/GestoredBadge";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { selectUser } from "../../slices/userSlice";
import VocabularyGestorsModal from "../vocabulary/VocabularyGestorsModal";
import LoadingOverlay from "../misc/LoadingOverlay";
import ErrorAlert from "../misc/ErrorAlert";

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

  const showAditional = (vocabulary: Vocabulary): React.ReactNode => {
    if (vocabulary.gestors?.some((v) => v.id === currentUser.id)) {
      return <GestoredBadge label={intl.formatMessage({ id: "gestored" })} />;
    }
    return <></>;
  };

  const handleGestorsClick = (vocabulary: Vocabulary) => {
    setSelectedVocabulary(vocabulary);
    setModalOpen(true);
  };

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <PublicationHeader
            label={publication.label}
            state={publication.state}
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
                actionIcon={<ContentPasteGoOutlinedIcon />}
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
          <Grid item md={12} sm={6} xs={12}>
            <PublicationStatistics publication={publication} />
          </Grid>
          <Grid item md={12} sm={6} xs={12}>
            <Item>
              <IslandHeader header={"Notifikace"} />
              <PublicationNotifications />
            </Item>
          </Grid>
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
