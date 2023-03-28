import React, { Suspense, useMemo, useState } from "react";
import { Change } from "../../model/Change";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionSummaryProps,
  Box,
  Collapse,
} from "@mui/material";
import { useIntl } from "react-intl";
import ChangeBasicDetail from "./tabs/ChangeBasicDetail";
import Constants from "../../utils/Constants";
import MappedLabel from "./MappedLabel";
import { styled } from "@mui/material/styles";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

interface ChangeDetailProps {
  change: Change;
}

const ChangeTurtleDetail = React.lazy(
  () => import("./tabs/ChangeTurtleDetail")
);
const ChangeCommentsDetail = React.lazy(
  () => import("./tabs/ChangeCommentsDetail")
);

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
            <CustomAccordionSummary expandIcon={<FullscreenIcon />}>
              <MappedLabel uri={change.predicate} variant={"h6"} />
            </CustomAccordionSummary>
          </Collapse>
          <AccordionDetails>
            <Suspense fallback={<>Loading</>}>{componentToRender}</Suspense>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

const CustomAccordionSummary = styled((props: AccordionSummaryProps) => (
  <AccordionSummary {...props} />
))(({ theme }) => ({
  "& .MuiAccordionSummary-expandIconWrapper": {
    paddingRight: theme.spacing(1),
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(0deg)",
  },
}));
export default ChangeListItem;
