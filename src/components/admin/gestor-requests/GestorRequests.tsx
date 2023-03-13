import React, { useMemo } from "react";
import GestorRequestAccordion from "./GestorRequestAccordion";
import { Box, Paper, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useGetAllGestorRequestsQuery } from "../../../api/adminApi";
import { VocabularyData } from "../../../model/Vocabulary";

//TODO: move this value to some utility
//helper function that returns void as a value
let voidValue = (function () {})();
const GestorRequests: React.FC = () => {
  const intl = useIntl();
  const { data: gRequests } = useGetAllGestorRequestsQuery(voidValue, {
    refetchOnMountOrArgChange: true,
  });

  let content = useMemo(() => {
    let temp = [];
    if (gRequests) {
      for (const [key, value] of Object.entries(gRequests)) {
        const vocabulary: VocabularyData = value[0].vocabulary;
        temp.push(
          <Box mb={2} key={key}>
            <GestorRequestAccordion
              vocabulary={vocabulary}
              gestorRequests={value}
            />
          </Box>
        );
      }
    }
    return temp;
  }, [gRequests]);

  return (
    <Box px={3} mt={6}>
      <Paper>
        <Box px={3} py={2}>
          <Typography variant={"h5"} gutterBottom={true}>
            {intl.formatMessage({ id: "requests" })}
          </Typography>
          <Box mt={2}>
            <hr />
          </Box>
        </Box>
        <Box sx={{ paddingBottom: 3 }}>{content}</Box>
      </Paper>
    </Box>
  );
};

export default GestorRequests;
