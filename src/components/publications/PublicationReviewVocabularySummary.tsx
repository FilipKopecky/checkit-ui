import React, { useMemo } from "react";
import { Grid, Paper } from "@mui/material";
import { useIntl } from "react-intl";
import ChangeListQuickAccess from "../change/ChangeListQuickAccess";
import { ChangeListData } from "./PublicationReviewVocabulary";
import PieChart from "../charts/PieChart";

interface PublicationReviewVocabularySummaryProps {
  changes: ChangeListData;
}

const PublicationReviewVocabularySummary: React.FC<
  PublicationReviewVocabularySummaryProps
> = ({ changes }) => {
  const intl = useIntl();
  //TODO: Move this calculation into utility
  const summary = useMemo(() => {
    let done = 0;
    let notReviewed = 0;
    for (const change of changes.allChanges) {
      if (change.state === "NOT_REVIEWED") notReviewed++;
      else done++;
    }
    return [
      { name: "pie-chart-not-reviewed", value: notReviewed },
      { name: "pie-chart-reviewed", value: done },
    ];
  }, [changes]);
  return (
    <>
      <Grid item md={12} sm={6} xs={12}>
        <Paper sx={{ height: "100%" }}>
          <PieChart
            data={summary}
            label={intl.formatMessage(
              { id: "pie-chart-changes-left" },
              { num: summary[0].value }
            )}
            fullCircle={false}
            animation={true}
          />
        </Paper>
      </Grid>
      <Grid item md={12} sm={6} xs={12}>
        <Paper sx={{ height: "100%" }}>
          <ChangeListQuickAccess changeListData={changes} />
        </Paper>
      </Grid>
    </>
  );
};

export default PublicationReviewVocabularySummary;
