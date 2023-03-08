import React, { useMemo } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import UsersList from "../users/UsersList";
import {
  useAddGestorToVocabularyMutation,
  useGetAllUsersQuery,
  useGetAllVocabulariesQuery,
  useRemoveGestorFromVocabularyMutation,
} from "../../api/apiSlice";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import { useIntl } from "react-intl";
import RemoveModeratorIcon from "@mui/icons-material/RemoveModerator";
import { User } from "../../model/User";

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
  const handleClose = () => {
    setOpen(false);
  };

  const { data, isLoading } = useGetAllUsersQuery();
  const [addGestor] = useAddGestorToVocabularyMutation();
  const [removeGestor] = useRemoveGestorFromVocabularyMutation();
  const { data: vocabularyData } = useGetAllVocabulariesQuery();
  const intl = useIntl();

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
            <Typography variant={"h5"}>{vocabulary?.label}</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box px={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box sx={{ paddingBottom: 4 }}>
                  <Typography variant={"h6"}>
                    {intl.formatMessage({ id: "others" })}
                  </Typography>
                  <UsersList
                    users={others}
                    performAction={handleAssigning}
                    icon={<AddModeratorIcon />}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ paddingBottom: 4 }}>
                  <Typography variant={"h6"}>
                    {intl.formatMessage({ id: "assignedGestors" })}
                  </Typography>
                  <UsersList
                    users={vocabulary?.gestors ?? []}
                    performAction={handleRemoval}
                    icon={<RemoveModeratorIcon />}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssignedVocabulariesModal;
