import { Statistics } from "../model/Statistics";

export const calculateTimeDifference = (
  date: Date,
  language: string,
  justNow: string
) => {
  const dateParsed = new Date(date);
  const formatter = new Intl.RelativeTimeFormat(language);
  let diff = new Date().getTime() - Number(dateParsed);
  diff /= 1000 * 60 * 60 * 24;
  if (diff >= 30) {
    diff /= 30;
    diff = Math.floor(diff);
    return formatter.format(-diff, "months");
  } else if (diff < 1 && diff * 60 * 24 >= 60) {
    diff *= 24;
    diff = Math.floor(diff);
    return formatter.format(-diff, "hours");
  } else if (diff < 1 && diff * 60 * 24 < 60) {
    diff *= 24 * 60;
    diff = Math.floor(diff);
    if (diff <= 0) {
      return justNow;
    }
    return formatter.format(-diff, "minutes");
  }
  diff = Math.floor(diff);
  return formatter.format(-diff, "days");
};

export const parseStatisticsToPieData = (statistics: Statistics) => {
  const approvedChanges = statistics.approvedChanges ?? 0;
  const rejectedChanges = statistics.rejectedChanges ?? 0;
  const reviewableChanges = statistics.reviewableChanges ?? 0;
  const parsedStatistics = [
    {
      name: "pie-chart-not-reviewed",
      value: reviewableChanges - approvedChanges - rejectedChanges,
    },
    {
      name: "pie-chart-accepted",
      value: approvedChanges,
    },
    {
      name: "pie-chart-rejected",
      value: rejectedChanges,
    },
  ];

  return parsedStatistics;
};

export const getStatisticsPercentage = (statistics: Statistics) => {
  if (!statistics) return 0;
  const approvedChanges = statistics.approvedChanges ?? 0;
  const rejectedChanges = statistics.rejectedChanges ?? 0;
  const reviewableChanges = statistics.reviewableChanges ?? 0;
  const percentage = Math.trunc(
    ((approvedChanges + rejectedChanges) / reviewableChanges) * 100
  );
  return percentage;
};
