import React from "react";
import { Box, Chip } from "@mui/material";

interface VocabularyFilterProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const VocabularyFilter: React.FC<VocabularyFilterProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <Box display={"flex"}>
      <Chip
        label="All"
        variant={activeTab === "all" ? "filled" : "outlined"}
        onClick={() => setActiveTab("all")}
      />
      <Chip
        label="Gestoring"
        variant={activeTab === "gestoring" ? "filled" : "outlined"}
        onClick={() => setActiveTab("gestoring")}
      />
      <Chip
        label="Requested"
        variant={activeTab === "requested" ? "filled" : "outlined"}
        onClick={() => setActiveTab("requested")}
      />
    </Box>
  );
};

export default VocabularyFilter;
