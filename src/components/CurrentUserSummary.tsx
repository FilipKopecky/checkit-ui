import React, { useMemo, useState } from "react";
import {
  useGetAllUsersQuery,
  useGetAllVocabulariesQuery,
  useGetCurrentUserQuery,
} from "../api/apiSlice";
import { Box } from "@mui/material";
import VocabularyFilter from "./vocabulary/VocabularyFilter";
import VocabulariesList from "./vocabulary/VocabulariesList";
import { filterVocabulariesByGestor } from "../utils/FilterUtils";
import { Vocabulary } from "../model/Vocabulary";

const CurrentUserSummary: React.FC = () => {
  const { data: allVocabularies } = useGetAllVocabulariesQuery();
  //TODO: add gestored vocabularies to current user
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: allUsers } = useGetAllUsersQuery();
  const [activeTab, setActiveTab] = useState("all");
  const user = useMemo(() => {
    return allUsers?.find((u) => u.id === currentUser.id);
  }, [currentUser, allUsers]);

  const displayedData: Vocabulary[] = useMemo(() => {
    if (!allVocabularies || !user) return [];
    if (activeTab === "all") {
      return allVocabularies;
    }
    if (activeTab === "gestoring") {
      return filterVocabulariesByGestor(allVocabularies, user);
    }
    if (activeTab === "requested") {
      //TODO: implement
      return [];
    }
    return [];
  }, [activeTab, allVocabularies, user]);

  return (
    <Box>
      <VocabularyFilter activeTab={activeTab} setActiveTab={setActiveTab} />
      <VocabulariesList vocabularies={displayedData} />
    </Box>
  );
};

export default CurrentUserSummary;
