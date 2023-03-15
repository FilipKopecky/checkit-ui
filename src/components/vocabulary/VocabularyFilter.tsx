import React from "react";
import { Box, Chip } from "@mui/material";
import { useIntl } from "react-intl";

interface VocabularyFilterProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const VocabularyFilter: React.FC<VocabularyFilterProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const intl = useIntl();
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Chip
        label={intl.formatMessage({ id: "all" })}
        variant={activeTab === "all" ? "filled" : "outlined"}
        onClick={() => setActiveTab("all")}
      />
      <Chip
        label={intl.formatMessage({ id: "gestored" })}
        variant={activeTab === "gestoring" ? "filled" : "outlined"}
        onClick={() => setActiveTab("gestoring")}
      />
      <Chip
        label={intl.formatMessage({ id: "requested-vocabularies" })}
        variant={activeTab === "requested" ? "filled" : "outlined"}
        onClick={() => setActiveTab("requested")}
      />
    </Box>
  );
};

export default VocabularyFilter;
