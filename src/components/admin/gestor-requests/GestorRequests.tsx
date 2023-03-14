import React, { useMemo } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useGetAllGestorRequestsQuery } from "../../../api/adminApi";
import { GestorRequest } from "../../../model/GestorRequest";
import { VocabularyData } from "../../../model/Vocabulary";
import GestorRequestAccordion from "./GestorRequestAccordion";

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
      const grouped = gRequests.reduce<{
        [key: string]: GestorRequest[];
      }>(function (r, a) {
        r[a.vocabulary.uri] = r[a.vocabulary.uri] || [];
        r[a.vocabulary.uri].push(a);
        return r;
      }, Object.create(null));

      for (const [key, value] of Object.entries(grouped)) {
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
