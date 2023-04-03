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
import { User, UserData } from "../../model/User";
import {
  useAddGestorToVocabularyMutation,
  useGetAllUsersQuery,
  useRemoveGestorFromVocabularyMutation,
} from "../../api/adminApi";
import SearchBar from "../misc/SearchBar";
import { filterUsersByName } from "../../utils/FilterUtils";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import { changeModalTab, selectAdminPanel } from "../../slices/adminPanelSlice";
import LoadingOverlay from "../misc/LoadingOverlay";
import ErrorAlert from "../misc/ErrorAlert";

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
  const dispatch = useAppDispatch();
  const adminPanelSelector = useAppSelector(selectAdminPanel);
  const [filterText, setFilterText] = useState("");
  const {
    data,
    isLoading: allUsersLoading,
    error: allUsersError,
  } = useGetAllUsersQuery();
  const [addGestor] = useAddGestorToVocabularyMutation();
  const [removeGestor] = useRemoveGestorFromVocabularyMutation();
  const {
    data: vocabularyData,
    isLoading: vocabularyDataLoading,
    error: vocabularyDataError,
  } = useGetAllVocabulariesQuery();
  const intl = useIntl();

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    dispatch(changeModalTab(newValue));
  };

  const handleClose = () => {
    dispatch(changeModalTab("others"));
    setOpen(false);
  };

  const vocabulary = useMemo(() => {
    return vocabularyData?.find(
      (vocabulary) => vocabulary.uri === vocabularyUri
    );
  }, [vocabularyData, vocabularyUri]);

  const displayedData = useMemo(() => {
    let selectedCategoryValues: UserData[] = [];
    if (adminPanelSelector.modalTab === "others") {
      selectedCategoryValues =
        data?.filter(
          (user) => !vocabulary?.gestors.some((gestor) => gestor.id === user.id)
        ) ?? [];
    } else {
      selectedCategoryValues =
        data?.filter((user) =>
          vocabulary?.gestors.some((gestor) => gestor.id === user.id)
        ) ?? [];
    }
    return filterUsersByName(selectedCategoryValues, filterText);
  }, [adminPanelSelector.modalTab, vocabulary?.gestors, data, filterText]);

  if (allUsersLoading || vocabularyDataLoading) return <LoadingOverlay />;
  if (allUsersError || !data) return <ErrorAlert />;
  if (vocabularyDataError || !vocabularyData) return <ErrorAlert />;

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

  const userListProps = () => {
    if (adminPanelSelector.modalTab === "others") {
      return {
        performAction: handleAssigning,
        icon: <AddModeratorIcon />,
      };
    } else {
      return {
        performAction: handleRemoval,
        icon: <RemoveModeratorIcon />,
      };
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>
          <Box px={1}>
            <Typography variant={"h6"}>{vocabulary?.label}</Typography>
          </Box>
          {handleClose ? (
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{ justifyContent: "space-between", display: "flex", flex: 1 }}
          >
            <Tabs
              value={adminPanelSelector.modalTab}
              onChange={handleTabChange}
            >
              <Tab
                value={"others"}
                label={
                  intl.formatMessage({ id: "others" }) +
                  ` (${data.length - (vocabulary?.gestors.length ?? 0)})`
                }
              />
              <Tab
                value={"gestors"}
                label={
                  intl.formatMessage({ id: "assignedGestors" }) +
                  ` (${vocabulary?.gestors.length})`
                }
              />
            </Tabs>
            <Box width={300} py={1}>
              <SearchBar
                fullWidth={true}
                value={filterText}
                setValue={setFilterText}
                label={intl.formatMessage({ id: "admin-panel-users-search" })}
              />
            </Box>
          </Box>
          <UsersList users={displayedData} {...userListProps()} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssignedVocabulariesModal;
