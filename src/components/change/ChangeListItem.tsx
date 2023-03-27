import React, { useMemo, useState } from "react";
import { Change } from "../../model/Change";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Collapse,
} from "@mui/material";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { useIntl } from "react-intl";
import ChangeBasicDetail from "./ChangeBasicDetail";
import ChangeTurtleDetail from "./ChangeTurtleDetail";
import ChangeCommentsDetail from "./ChangeCommentsDetail";
import Constants from "../../utils/Constants";
import PredicateLabel from "./PredicateLabel";

interface ChangeDetailProps {
  change: Change;
}

const ChangeListItem: React.FC<ChangeDetailProps> = ({ change }) => {
  const [expanded, setExpanded] = useState(true);

  const handleChange = (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded);
  };

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
        return <ChangeBasicDetail change={change} setOpen={setExpanded} />;
      case Constants.CHANGE_DETAIL.TABS.TURTLE:
        return <ChangeTurtleDetail change={change} />;
      case Constants.CHANGE_DETAIL.TABS.COMMENTS:
        return <ChangeCommentsDetail />;
      default:
        return null;
    }
  }, [activeTab, change]);

  return (
    <Box sx={{ paddingRight: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: "background.default" }}>
        <Accordion expanded={expanded} onChange={handleChange} square>
          <Collapse in={!expanded} timeout="auto" unmountOnExit>
            <AccordionSummary expandIcon={<FullscreenExitIcon />}>
              <PredicateLabel uri={change.predicate} variant={"h6"} />
            </AccordionSummary>
          </Collapse>
          <AccordionDetails>{componentToRender}</AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default ChangeListItem;
