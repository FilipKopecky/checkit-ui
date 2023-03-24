import React, { useMemo, useState } from "react";
import { Change } from "../../model/Change";
import { resolveChangeDescription } from "../../utils/ChangeUtils";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useIntl } from "react-intl";
import ChangeBasicDetail from "./ChangeBasicDetail";
import ChangeTurtleDetail from "./ChangeTurtleDetail";
import ChangeCommentsDetail from "./ChangeCommentsDetail";
import Constants from "../../utils/Constants";

interface ChangeDetailProps {
  change: Change;
}

const ChangeDetail: React.FC<ChangeDetailProps> = ({ change }) => {
  const resolvedDescription = resolveChangeDescription(change);
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
        return <ChangeTurtleDetail />;
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
          <Typography variant={"body1"}>{resolvedDescription}</Typography>
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
                label={intl.formatMessage({ id: "change-detail-comments-tab" })}
              />
            </Tabs>
            <Box>
              <Button>Accept</Button>
              <Button>Decline</Button>
            </Box>
          </Box>
          <Box mt={2}>{componentToRender}</Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ChangeDetail;
