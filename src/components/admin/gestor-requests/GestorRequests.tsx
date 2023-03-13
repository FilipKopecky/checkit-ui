import React from "react";
import GestorRequestAccordion from "./GestorRequestAccordion";
import { Box, Paper, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useGetAllVocabulariesQuery } from "../../../api/vocabularyApi";
import { User } from "../../../model/User";
import { useGetAllUsersQuery } from "../../../api/adminApi";
const GestorRequests: React.FC = () => {
  const intl = useIntl();

  /** Data mock */
  const { data: vocabularies } = useGetAllVocabulariesQuery();
  const { data: users } = useGetAllUsersQuery();
  if (!vocabularies || !users) return <></>;

  const mockedRequests = 3;
  const mockedRequestsData = [];
  for (let i = 0; i < mockedRequests; i++) {
    const randomUsers: User[] = [];
    for (let j = 0; j < i + 1; j++) {
      const randomUser = users![getRandomInt(users!.length)];
      randomUsers.push(randomUser);
    }
    const randomVocabulary = vocabularies![getRandomInt(vocabularies!.length)];
    const request = { vocabulary: randomVocabulary, users: randomUsers };
    mockedRequestsData.push(request);
  }
  /** Data mock */

  //TODO: Fetch on mount

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
        <Box sx={{ paddingBottom: 3 }}>
          {mockedRequestsData.map((request) => {
            return (
              <Box mb={2} key={request.vocabulary.uri}>
                <GestorRequestAccordion
                  vocabulary={request.vocabulary}
                  users={request.users}
                />
              </Box>
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default GestorRequests;
