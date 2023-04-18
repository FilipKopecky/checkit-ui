import React, { ReactNode } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface ModalWrapperProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  dialogHeader: string;
  submitFunction?: () => void;
  submitText: string;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  open,
  setOpen,
  children,
  dialogHeader,
  submitFunction,
  submitText,
}) => {
  const handleClose = () => {
    setOpen(false);
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
          <Box>
            <Typography variant={"h6"}>{dialogHeader}</Typography>
          </Box>
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
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
        {submitFunction && (
          <DialogActions>
            <Button onClick={submitFunction}>{submitText}</Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default ModalWrapper;
