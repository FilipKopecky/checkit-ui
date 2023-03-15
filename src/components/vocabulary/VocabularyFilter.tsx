import React from "react";
import { Box, Chip } from "@mui/material";
import { useIntl } from "react-intl";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

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
        icon={<Inventory2OutlinedIcon />}
      />
      <Chip
        label={intl.formatMessage({ id: "gestored-vocabularies" })}
        variant={activeTab === "gestoring" ? "filled" : "outlined"}
        onClick={() => setActiveTab("gestoring")}
        icon={<LocalLibraryOutlinedIcon />}
      />
      <Chip
        label={intl.formatMessage({ id: "requested-vocabularies" })}
        variant={activeTab === "requested" ? "filled" : "outlined"}
        onClick={() => setActiveTab("requested")}
        icon={<EmojiPeopleOutlinedIcon />}
      />
    </Box>
  );
};

export default VocabularyFilter;
