import messages_cs from "../translations/cs.json";
import messages_en from "../translations/en.json";
import Constants from "./Constants";
import { LanguageState } from "../slices/languageSlice";

export const getLocalisedMessages = (): LanguageState => {
  const storedPreff = localStorage.getItem(Constants.STORAGE_LANG_KEY);
  const language = storedPreff ? storedPreff : navigator.language;
  if (language === Constants.LOCALES.CS) {
    return {
      messages: messages_cs,
      language: Constants.LOCALES.CS,
    };
  } else {
    return {
      messages: messages_en,
      language: Constants.LOCALES.EN,
    };
  }
};

export function saveLanguagePreference(language: string): void {
  localStorage.setItem(Constants.STORAGE_LANG_KEY, language);
}
