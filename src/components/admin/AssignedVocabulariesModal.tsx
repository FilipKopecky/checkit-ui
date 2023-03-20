import React, { useMemo, useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import UsersList from "../users/UsersList";
import { useGetAllVocabulariesQuery } from "../../api/vocabularyApi";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import { useIntl } from "react-intl";
import RemoveModeratorIcon from "@mui/icons-material/RemoveModerator";
import { User } from "../../model/User";
import {
  useAddGestorToVocabularyMutation,
  useGetAllUsersQuery,
  useRemoveGestorFromVocabularyMutation,
} from "../../api/adminApi";
import SearchBar from "../misc/SearchBar";

interface AssignedVocabulariesModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  vocabularyUri?: string;
}

const AssignedVocabulariesModal: React.FC<AssignedVocabulariesModalProps> = ({
  open,
  setOpen,
  vocabularyUri,
}) => {
  const [activeTab, setActiveTab] = useState("others");
  const [filterText, setFilterText] = useState("");
  const { data, isLoading } = useGetAllUsersQuery();
  const [addGestor] = useAddGestorToVocabularyMutation();
  const [removeGestor] = useRemoveGestorFromVocabularyMutation();
  const { data: vocabularyData } = useGetAllVocabulariesQuery();
  const intl = useIntl();

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const handleClose = () => {
    setActiveTab("others");
    setOpen(false);
  };

  const vocabulary = useMemo(() => {
    return vocabularyData?.find(
      (vocabulary) => vocabulary.uri === vocabularyUri
    );
  }, [vocabularyData, vocabularyUri]);

  const others = useMemo(() => {
    return (
      data?.filter(
        (user) => !vocabulary?.gestors.some((gestor) => gestor.id === user.id)
      ) ?? []
    );
  }, [vocabulary?.gestors, data]);

  if (isLoading) return <>Loading....</>;
  if (!data) return <>Doen</>;

  const handleAssigning = (user: User) => {
    const gestors = vocabulary?.gestors.concat(user);
    addGestor({ gestors: gestors, uri: vocabulary?.uri }).then(() =>
      console.log(`Assigning ${user.firstName} to ${vocabulary?.label}`)
    );
  };

  const handleRemoval = (user: User) => {
    const gestors = vocabulary?.gestors.filter(
      (gestor) => gestor.id !== user.id
    );
    removeGestor({ gestors: gestors, uri: vocabulary?.uri, id: user.id }).then(
      () => {
        console.log(`Removal ${user.firstName} from ${vocabulary?.label}`);
      }
    );
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle>
          <Box px={1}>
            <Typography variant={"h5"}>Správa slovníku</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box
            py={1}
            sx={{ justifyContent: "space-between", display: "flex", flex: 1 }}
          >
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab
                value={"others"}
                label={intl.formatMessage({ id: "others" })}
              />
              <Tab
                value={"gestors"}
                label={intl.formatMessage({ id: "assignedGestors" })}
              />
            </Tabs>
            <SearchBar
              value={filterText}
              onChange={handleFilter}
              label={"Zadejte jméno uživatele"}
            />
          </Box>

          {activeTab === "others" && (
            <UsersList
              users={others}
              performAction={handleAssigning}
              icon={<AddModeratorIcon />}
            />
          )}
          {activeTab === "gestors" && (
            <UsersList
              users={vocabulary?.gestors ?? []}
              performAction={handleRemoval}
              icon={<RemoveModeratorIcon />}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssignedVocabulariesModal;
