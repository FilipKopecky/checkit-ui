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
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
