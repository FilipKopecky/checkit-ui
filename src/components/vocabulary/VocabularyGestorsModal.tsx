import React from "react";
import { Vocabulary } from "../../model/Vocabulary";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import UsersList from "../users/UsersList";
import { useIntl } from "react-intl";

interface VocabularyGestorsModalProps {
  vocabulary?: Vocabulary;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VocabularyGestorsModal: React.FC<VocabularyGestorsModalProps> = ({
  vocabulary,
  open,
  setOpen,
}) => {
  const intl = useIntl();
  const handleClose = () => {
    setOpen(false);
  };

  if (!vocabulary) {
    return <></>;
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>
          <Box px={1}>
            <Typography variant={"h5"}>{vocabulary.label}</Typography>
            <hr />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box px={1}>
            <Typography variant={"h6"}>
              {intl.formatMessage({ id: "assignedGestors" })}
            </Typography>
            <UsersList users={vocabulary.gestors} />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VocabularyGestorsModal;
