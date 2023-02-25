import messages_cs from "../translations/cs.json";
import messages_en from "../translations/en.json";
import Constants from "./Constants";

export const getLocalisedMessages = (language: string) => {
  if (language === Constants.LOCALES.CS) {
    return messages_cs;
  } else {
    return messages_en;
  }
};
