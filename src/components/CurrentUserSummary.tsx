import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";
import {
  useGetAllVocabulariesQuery,
  useGetMyGestoredVocabulariesQuery,
} from "../api/vocabularyApi";
import VocabulariesList from "./vocabulary/VocabulariesList";
import { Vocabulary } from "../model/Vocabulary";
import VocabularyFilter from "./vocabulary/VocabularyFilter";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import { useAddGestorRequestMutation } from "../api/gestorRequestApi";

const CurrentUserSummary: React.FC = () => {
  const { data: allVocabularies } = useGetAllVocabulariesQuery();
  const { data: myGestored } = useGetMyGestoredVocabulariesQuery();
  const [addGestorRequest] = useAddGestorRequestMutation();
  const [activeTab, setActiveTab] = useState("all");

  const disableElement = (vocabulary: Vocabulary): boolean => {
    //TODO: Think about the disable element function. This is gonna get kinda pricey to calculate
    return myGestored?.some((v) => v.uri === vocabulary.uri) ?? false;
  };

  const handleAddGestorRequest = (vocabulary: Vocabulary) => {
    addGestorRequest({ uri: vocabulary.uri });
  };

  const displayedData: Vocabulary[] = useMemo(() => {
    if (!allVocabularies || !myGestored) return [];
    if (activeTab === "all") {
      return allVocabularies;
    }
    if (activeTab === "gestoring") {
      return myGestored;
    }
    if (activeTab === "requested") {
      //TODO: implement
      return [];
    }
    return [];
  }, [activeTab, allVocabularies, myGestored]);

  if (!allVocabularies) return <Box></Box>;
  return (
    <Box>
      <VocabularyFilter activeTab={activeTab} setActiveTab={setActiveTab} />
      <VocabulariesList
        vocabularies={displayedData}
        action={handleAddGestorRequest}
        actionIcon={<EmojiPeopleOutlinedIcon />}
        disabled={disableElement}
      />
    </Box>
  );
};

export default CurrentUserSummary;
