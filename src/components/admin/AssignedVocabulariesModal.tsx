import React from "react";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { Vocabulary } from "../../model/Vocabulary";
import UsersList from "../users/UsersList";
import { useGetAllUsersQuery } from "../../api/apiSlice";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import { useIntl } from "react-intl";

interface AssignedVocabulariesModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  vocabulary?: Vocabulary;
}
const AssignedVocabulariesModal: React.FC<AssignedVocabulariesModalProps> = ({
  open,
  setOpen,
  vocabulary,
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const { data, isLoading } = useGetAllUsersQuery();
  const intl = useIntl();
  if (!data) return <>Doen</>;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle>{vocabulary?.label}</DialogTitle>
        <DialogContent>
          <Typography variant={"h5"} gutterBottom={true}>
            {intl.formatMessage({ id: "assignedGestors" })}
          </Typography>
          <UsersList
            users={vocabulary?.gestors ?? []}
            performAction={() => console.log("action")}
            icon={<AddModeratorIcon />}
          />
          <Typography variant={"h5"} gutterBottom={true}>
            {intl.formatMessage({ id: "others" })}
          </Typography>
          <UsersList
            users={data}
            performAction={() => console.log("action")}
            icon={<AddModeratorIcon />}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssignedVocabulariesModal;
