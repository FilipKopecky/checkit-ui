import React, { useMemo } from "react";
import GestorRequestAccordion from "./GestorRequestAccordion";
import { Box, Paper, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { UserData } from "../../../model/User";
import { useGetAllGestorRequestsQuery } from "../../../api/adminApi";
import { VocabularyData } from "../../../model/Vocabulary";

const GestorRequests: React.FC = () => {
  const intl = useIntl();
  const { data: gRequests } = useGetAllGestorRequestsQuery();

  let content = useMemo(() => {
    let temp = [];
    if (gRequests) {
      for (const [key, value] of Object.entries(gRequests)) {
        const users: UserData[] = [];
        for (const request of value) {
          users.push(request.applicant);
        }
        const vocabulary: VocabularyData = value[0].vocabulary;
        temp.push(
          <Box mb={2} key={key}>
            <GestorRequestAccordion vocabulary={vocabulary} users={users} />
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
