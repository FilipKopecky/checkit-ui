import React, { useMemo } from "react";
import { Box } from "@mui/material";
import PieChart from "../charts/PieChart";
import { VocabularyChanges } from "../../model/Change";
import { useIntl } from "react-intl";
import ChangeListQuickAccess from "../change/ChangeListQuickAccess";

interface PublicationReviewVocabularySummaryProps {
  changes: VocabularyChanges;
}

const PublicationReviewVocabularySummary: React.FC<
  PublicationReviewVocabularySummaryProps
> = ({ changes }) => {
  const intl = useIntl();
  const summary = useMemo(() => {
    let done = 0;
    let notReviewed = 0;
    for (const change of changes.changes) {
      if (change.state === "NOT_REVIEWED") notReviewed++;
      else done++;
    }
    return [
      { name: "pie-chart-not-reviewed", value: notReviewed },
      { name: "pie-chart-reviewed", value: done },
    ];
  }, [changes]);
  return (
    <Box flex={1} p={2}>
      <PieChart
        data={summary}
        label={intl.formatMessage(
          { id: "pie-chart-changes-left" },
          { num: summary[0].value }
        )}
        fullCircle={false}
        animation={true}
      />
      <ChangeListQuickAccess />
    </Box>
  );
};

export default PublicationReviewVocabularySummary;
