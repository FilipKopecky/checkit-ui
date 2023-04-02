import React, { Suspense, useCallback, useMemo } from "react";
import { Change } from "../../model/Change";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionSummaryProps,
  Box,
  Collapse,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";
import ChangeBasicDetail from "./tabs/ChangeBasicDetail";
import Constants from "../../utils/Constants";
import MappedLabel from "./MappedLabel";
import { styled } from "@mui/material/styles";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import {
  selectChangeById,
  switchTab,
  toggleChange,
} from "../../slices/changeSlice";
import TabNavigation from "../misc/TabNavigation";
import IconButton from "@mui/material/IconButton";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { isMapped } from "../../utils/ChangeUtils";

interface ChangeDetailProps {
  change: Change;
}

const ChangeTurtleDetail = React.lazy(
  () => import("./tabs/ChangeTurtleDetail")
);
const ChangeCommentsDetail = React.lazy(
  () => import("./tabs/ChangeCommentsDetail")
);

const tabs = [
  Constants.CHANGE_DETAIL.TABS.BASIC,
  Constants.CHANGE_DETAIL.TABS.TURTLE,
  Constants.CHANGE_DETAIL.TABS.COMMENTS,
];

const ChangeListItem: React.FC<ChangeDetailProps> = ({ change }) => {
  const dispatch = useAppDispatch();
  const handleTabSwitch = (event: React.SyntheticEvent, newValue: string) => {
    dispatch(switchTab({ uri: change.uri, tab: newValue }));
  };
  const selectedItem = useAppSelector((state) =>
    selectChangeById(state, change.uri)
  );

  const handleToggle = useCallback(() => {
    dispatch(toggleChange(change.uri));
  }, [dispatch, change.uri]);

  const expanded = selectedItem!.expanded;
  const activeTab = selectedItem!.activeTab;

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
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "background.default" }}>
        <Accordion expanded={expanded} onChange={handleToggle} square>
          <Collapse in={!expanded} timeout="auto" unmountOnExit>
            <CustomAccordionSummary expandIcon={<FullscreenIcon />}>
              <Box display={"flex"}>
                <Box
                  mr={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {change.state === "APPROVED" && (
                    <CheckIcon color={"success"} />
                  )}
                  {change.state === "REJECTED" && <CloseIcon color={"error"} />}
                </Box>
                <MappedLabel uri={change.predicate} variant={"h6"} />
              </Box>
            </CustomAccordionSummary>
          </Collapse>
          <AccordionDetails>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flex: 1,
                alignItems: "center",
                marginBottom: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MappedLabel uri={change.predicate} variant={"h6"} />
                {isMapped(change.predicate) && (
                  <NoMaxWidthTooltip
                    title={
                      <Typography fontSize={16}>{change.predicate}</Typography>
                    }
                    placement={"right"}
                  >
                    <HelpOutlineOutlinedIcon color={"primary"} />
                  </NoMaxWidthTooltip>
                )}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TabNavigation
                  tabs={tabs}
                  activeTab={activeTab}
                  setActiveTab={handleTabSwitch}
                />
                <Box>
                  <IconButton onClick={handleToggle}>
                    <FullscreenExitIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
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

const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    children={props.children}
  />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: "none",
  },
});

export default ChangeListItem;
