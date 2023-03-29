export const calculateTimeDifference = (date: Date, language: string) => {
  const formatter = new Intl.RelativeTimeFormat(language);
  let diff = new Date().getTime() - Number(date);
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
    return formatter.format(-diff, "minutes");
  }
  diff = Math.floor(diff);
  return formatter.format(-diff, "days");
};
