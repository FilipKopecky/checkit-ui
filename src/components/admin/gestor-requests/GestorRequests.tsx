import React, { useMemo } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useGetAllGestorRequestsQuery } from "../../../api/gestorRequestApi";
import { GestorRequest } from "../../../model/GestorRequest";
import { VocabularyData } from "../../../model/Vocabulary";
import GestorRequestAccordion from "./GestorRequestAccordion";
import { Virtuoso } from "react-virtuoso";
import EmptyPlaceholder from "../../misc/VirtuosoEmptyPlaceholder";

//TODO: move this value to some utility
//helper function that returns void as a value
let voidValue = (function () {})();
const GestorRequests: React.FC = () => {
  const intl = useIntl();
  const { data: gRequests } = useGetAllGestorRequestsQuery(voidValue, {
    refetchOnMountOrArgChange: true,
  });

  let content = useMemo(() => {
    let data = [];
    if (gRequests) {
      const grouped = gRequests.reduce<{
        [key: string]: GestorRequest[];
      }>(function (r, a) {
        r[a.vocabulary.uri] = r[a.vocabulary.uri] || [];
        r[a.vocabulary.uri].push(a);
        return r;
      }, Object.create(null));

      for (const [, value] of Object.entries(grouped)) {
        const vocabulary: VocabularyData = value[0].vocabulary;
        data.push({ vocabulary: vocabulary, value: value });
      }
    }
    return data;
  }, [gRequests]);

  const itemContent = (index: any, request: any) => {
    return <InnerItem index={index} request={request} />;
  };

  return (
    <Box px={3} mt={6} pb={5}>
      <Paper>
        <Box px={3} py={2}>
          <Typography variant={"h5"} gutterBottom={true}>
            {intl.formatMessage({ id: "requests" })}
          </Typography>
          <Box mt={2}>
            <hr />
          </Box>
        </Box>
        <Box sx={{ paddingBottom: 4 }}>
          <Virtuoso
            data={content}
            useWindowScroll
            itemContent={itemContent}
            components={{ EmptyPlaceholder: EmptyPlaceholder }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

const InnerItem = React.memo(({ request, index }: any) => {
  return (
    <Box pb={3} key={index}>
      <GestorRequestAccordion
        vocabulary={request.vocabulary}
        gestorRequests={request.value}
      />
    </Box>
  );
});

export default GestorRequests;
