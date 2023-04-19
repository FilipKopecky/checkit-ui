import {
  Button,
  DialogActions,
  DialogContentText,
  TextField,
} from "@mui/material";
import React from "react";
import ModalWrapper from "../misc/ModalWrapper";
import { useIntl } from "react-intl";
import { Publication } from "../../model/Publication";
import { useController, UseControllerProps, useForm } from "react-hook-form";
import { useApproveOrRejectPublicationMutation } from "../../api/publicationApi";
import { useSnackbar } from "notistack";

interface PublicationSubmitModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  publication: Publication;
  reject?: boolean;
}

type FormValues = {
  ClosingComment: string;
};

const PublicationSubmitModal: React.FC<PublicationSubmitModalProps> = ({
  open,
  setOpen,
  publication,
  reject,
}) => {
  const intl = useIntl();
  const [resolvePublicationState] = useApproveOrRejectPublicationMutation();
  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      ClosingComment: "",
    },
    mode: "onChange",
  });
  const onSubmit = (data: FormValues) => {
    resolvePublicationState({
      id: publication.id,
      state: reject ? "REJECTED" : "APPROVED",
      finalComment:
        data.ClosingComment.length === 0 ? `""` : data.ClosingComment,
    })
      .unwrap()
      .catch(() => {
        enqueueSnackbar(intl.formatMessage({ id: "something-went-wrong" }), {
          variant: "error",
        });
      });
    setOpen(false);
  };

  let info;
  let rules = reject ? { required: true, minLength: 10 } : { required: false };

  if (reject) {
    info = intl.formatMessage({ id: "publication-modal-reject" });
  } else {
    info = intl.formatMessage({ id: "publication-modal-approve" });
  }

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      dialogHeader={intl.formatMessage({ id: "submit-publication" })}
      submitText={intl.formatMessage({ id: "submit-publication" })}
    >
      <DialogContentText>{info}</DialogContentText>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input control={control} name="ClosingComment" rules={rules} />
        <DialogActions>
          <Button type={"submit"}>
            {reject
              ? intl.formatMessage({ id: "publication-decline" })
              : intl.formatMessage({ id: "publication-submit" })}
          </Button>
        </DialogActions>
      </form>
    </ModalWrapper>
  );
};

function Input(props: UseControllerProps<FormValues>) {
  const { field, fieldState } = useController(props);
  const intl = useIntl();
  return (
    <TextField
      inputRef={field.ref}
      {...field}
      rows={4}
      multiline
      fullWidth
      error={!!fieldState.error}
      placeholder={intl.formatMessage({
        id: "publication-modal-text-placeholder",
      })}
      helperText={
        fieldState.error
          ? intl.formatMessage(
              { id: "error-text-length" },
              { num: props.rules?.minLength?.toString() }
            )
          : ""
      }
    />
  );
}

export default PublicationSubmitModal;
