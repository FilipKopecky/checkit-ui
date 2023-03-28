import React, { Suspense, useCallback, useMemo, useState } from "react";
import { Change } from "../../model/Change";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionSummaryProps,
  Box,
  Collapse,
} from "@mui/material";
import ChangeBasicDetail from "./tabs/ChangeBasicDetail";
import Constants from "../../utils/Constants";
import MappedLabel from "./MappedLabel";
import { styled } from "@mui/material/styles";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import { selectChangeById, toggleChange } from "../../slices/changeSlice";

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
  const dispatch = useAppDispatch();
  const selectedItem = useAppSelector((state) =>
    selectChangeById(state, change.uri)
  );

  const handleChange = useCallback(() => {
    dispatch(toggleChange(change.uri));
  }, [dispatch, change.uri]);

  const expanded = selectedItem!.expanded;

  const [activeTab] = useState(Constants.CHANGE_DETAIL.TABS.BASIC);

  const componentToRender = useMemo(() => {
    switch (activeTab) {
      case Constants.CHANGE_DETAIL.TABS.BASIC:
        return (
          <ChangeBasicDetail change={change} toggle={() => handleChange()} />
        );
      case Constants.CHANGE_DETAIL.TABS.TURTLE:
        return <ChangeTurtleDetail change={change} />;
      case Constants.CHANGE_DETAIL.TABS.COMMENTS:
        return <ChangeCommentsDetail />;
      default:
        return null;
    }
  }, [activeTab, change, handleChange]);

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
