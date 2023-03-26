import React, { useMemo, useState } from "react";
import { Change } from "../../model/Change";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionSummaryProps,
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
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
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
    <Box
      sx={{
        color: "white",
      }}
    >
      <Accordion TransitionProps={{ unmountOnExit: true }} square>
        <AccordionSummaryWithIconOnLeft
          sx={{
            backgroundColor: "background.default",
            color: "black",
            flexDirection: "row-reverse",
          }}
          expandIcon={<ExpandMoreIcon color={"primary"} />}
        >
          <ChangeHeader change={change} />
        </AccordionSummaryWithIconOnLeft>
        <AccordionDetails
          sx={{
            borderLeft: 1,
            borderRight: 1,
            borderColor: "background.default",
          }}
        >
          <Box
            sx={{
              justifyContent: "space-between",
              display: "flex",
              flex: 1,
            }}
          >
            <Box flex={1}>
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
              <Box mr={3}>
                <Divider />
              </Box>
            </Box>
            <Box pt={1}>
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
                sx={{ marginRight: 2 }}
                onClick={() => console.log("Change declined")}
              >
                {intl.formatMessage({ id: "decline" })}
              </Button>
            </Box>
          </Box>

          <Box mt={2}>{componentToRender}</Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

const AccordionSummaryWithIconOnLeft = styled(
  (props: AccordionSummaryProps) => (
    <AccordionSummary
      {...props}
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    />
  )
)(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  "& .MuiAccordionSummary-content.Mui-expanded": {
    marginLeft: theme.spacing(1),
  },
}));

export default ChangeListItem;
