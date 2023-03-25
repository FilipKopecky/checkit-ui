import React, { useMemo, useState } from "react";
import { Change } from "../../model/Change";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Tab,
  Tabs,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useIntl } from "react-intl";
import ChangeBasicDetail from "./ChangeBasicDetail";
import ChangeTurtleDetail from "./ChangeTurtleDetail";
import ChangeCommentsDetail from "./ChangeCommentsDetail";
import Constants from "../../utils/Constants";
import ChangeHeader from "./ChangeHeader";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Divider from "@mui/material/Divider";

interface ChangeDetailProps {
  change: Change;
}

const ChangeListItem: React.FC<ChangeDetailProps> = ({ change }) => {
  const [activeTab, setActiveTab] = useState(
    Constants.CHANGE_DETAIL.TABS.BASIC
  );
  const intl = useIntl();
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const componentToRender = useMemo(() => {
    switch (activeTab) {
      case Constants.CHANGE_DETAIL.TABS.BASIC:
        return <ChangeBasicDetail change={change} />;
      case Constants.CHANGE_DETAIL.TABS.TURTLE:
        return <ChangeTurtleDetail change={change} />;
      case Constants.CHANGE_DETAIL.TABS.COMMENTS:
        return <ChangeCommentsDetail />;
      default:
        return null;
    }
  }, [activeTab, change]);

  return (
    <Box px={2} sx={{ color: "white" }}>
      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary
          sx={{
            backgroundColor: "background.default",
            color: "black",
          }}
          expandIcon={<ExpandMoreIcon color={"primary"} />}
        >
          <ChangeHeader change={change} />
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              justifyContent: "space-between",
              display: "flex",
              flex: 1,
            }}
          >
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab
                value={Constants.CHANGE_DETAIL.TABS.BASIC}
                label={intl.formatMessage({ id: "change-detail-basic-tab" })}
              />
              <Tab
                value={Constants.CHANGE_DETAIL.TABS.TURTLE}
                label={intl.formatMessage({ id: "change-detail-turtle-tab" })}
              />
              <Tab
                value={Constants.CHANGE_DETAIL.TABS.COMMENTS}
                label={intl.formatMessage({
                  id: "change-detail-comments-tab",
                })}
              />
            </Tabs>
            <Box pt={1}>
              <Button
                size={"small"}
                variant="contained"
                endIcon={<CheckCircleOutlinedIcon />}
                color={"success"}
                sx={{ marginRight: 2 }}
                onClick={() => console.log("Change accepted")}
              >
                Schválit
              </Button>
              <Button
                size={"small"}
                variant="contained"
                endIcon={<CancelOutlinedIcon />}
                color={"error"}
                sx={{ marginRight: 2 }}
                onClick={() => console.log("Change declined")}
              >
                Zamítnout
              </Button>
            </Box>
          </Box>
          <Divider />
          <Box mt={2}>{componentToRender}</Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ChangeListItem;
