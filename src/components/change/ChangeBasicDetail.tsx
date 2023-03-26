import React from "react";
import { Change } from "../../model/Change";
import { Box, Button, Chip } from "@mui/material";
import ObjectLabel from "./ObjectLabel";
import Divider from "@mui/material/Divider";
import { useIntl } from "react-intl";
import ChangePredicateLabel from "./ChangePredicateLabel";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

interface ChangeBasicDetailProps {
  change: Change;
}

const ChangeBasicDetail: React.FC<ChangeBasicDetailProps> = ({ change }) => {
  const intl = useIntl();
  return (
    <Box px={1}>
      <Box mb={2}>
        <Box
          sx={{
            justifyContent: "space-between",
            display: "flex",
            flex: 1,
          }}
        >
          <ChangePredicateLabel
            uri={change.predicate}
            variant={"h6"}
            gutterBottom
          />
          <Box>
            <Button
              size={"small"}
              variant="outlined"
              endIcon={<CheckCircleOutlinedIcon />}
              color={"success"}
              sx={{ marginRight: 2 }}
              onClick={() => console.log("Change accepted")}
            >
              {intl.formatMessage({ id: "accept" })}
            </Button>
            <Button
              size={"small"}
              variant="outlined"
              endIcon={<CancelOutlinedIcon />}
              color={"error"}
              onClick={() => console.log("Change declined")}
            >
              {intl.formatMessage({ id: "decline" })}
            </Button>
          </Box>
        </Box>
        <Box mb={1} mt={1} sx={{ textTransform: "uppercase" }}>
          <Chip
            size={"small"}
            sx={{ fontSize: "10px" }}
            color={change.state === "DELETED" ? "error" : "success"}
            label={
              change.state === "DELETED"
                ? intl.formatMessage({ id: "change-detail-deleted" })
                : intl.formatMessage({ id: "change-detail-new" })
            }
          />
        </Box>
        <ObjectLabel
          objectUri={change.newObject || change.object}
          variant={"body1"}
        />
      </Box>
      {change.state === "MODIFIED" && (
        <Box>
          <Divider />
          <Box mt={2} py={1}>
            <Box mb={1} sx={{ textTransform: "uppercase" }}>
              <Chip
                size={"small"}
                color={"warning"}
                sx={{ fontSize: "10px" }}
                label={intl.formatMessage({ id: "change-detail-original" })}
              />
            </Box>
            <ObjectLabel objectUri={change.object} variant={"body1"} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChangeBasicDetail;
