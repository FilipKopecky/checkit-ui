import React from "react";
import { Change } from "../../../model/Change";
import { useIntl } from "react-intl";
import { Box, Button, Grid } from "@mui/material";
import MappedLabel from "../MappedLabel";
import IconButton from "@mui/material/IconButton";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ObjectLabel from "../ObjectLabel";
import { getModificationColor } from "../../../utils/ChangeUtils";
import { styled } from "@mui/material/styles";
import TabNavigation from "../../misc/TabNavigation";

interface ChangeBasicDetailProps {
  change: Change;
  toggle: () => void;
}

const ChangeBasicDetail: React.FC<ChangeBasicDetailProps> = ({
  change,
  toggle,
}) => {
  const intl = useIntl();
  const tabs = [
    "change-detail-basic-tab",
    "change-detail-turtle-tab",
    "change-detail-comments-tab",
  ];
  const [value, setValue] = React.useState("change-detail-basic-tab");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box pt={1} pb={1}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flex: 1,
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        <MappedLabel uri={change.predicate} variant={"h6"} />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TabNavigation
            tabs={tabs}
            activeTab={value}
            setActiveTab={handleChange}
          />
          <Box>
            <IconButton onClick={() => toggle()}>
              <FullscreenExitIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <ModifiedObject objectUri={change.object} state={change.type} />
          </Grid>
          {change.type === "MODIFIED" && (
            <>
              <Grid item md={1} xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Arrow fontSize={"large"} />
                </Box>
              </Grid>
              <Grid item md={5} xs={12}>
                <ModifiedObject
                  objectUri={change.newObject!}
                  state={"CREATED"}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
      <Box mt={4}>
        <Button
          size={"small"}
          variant="outlined"
          color={"success"}
          sx={{ marginRight: 2 }}
          onClick={() => console.log("Change accepted")}
        >
          {intl.formatMessage({ id: "accept" })}
        </Button>
        <Button
          size={"small"}
          variant="outlined"
          color={"error"}
          onClick={() => console.log("Change declined")}
        >
          {intl.formatMessage({ id: "decline" })}
        </Button>
      </Box>
    </Box>
  );
};

interface ModifiedObjectProps {
  objectUri: string;
  state: string;
}

const ModifiedObject: React.FC<ModifiedObjectProps> = ({
  objectUri,
  state,
}) => {
  return (
    <Box
      sx={{
        borderLeft: 6,
        borderColor: getModificationColor(state),
        paddingLeft: 2,
        height: "100%",
      }}
    >
      <ObjectLabel objectUri={objectUri} variant={"body1"} />
    </Box>
  );
};

const Arrow = styled(ArrowForwardIcon)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    transform: "rotate(90deg)",
  },
}));

export default ChangeBasicDetail;
