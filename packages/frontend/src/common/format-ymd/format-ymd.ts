import { convert, LocalDate } from "@js-joda/core";

export const formatYMD = (ymd: string, locale = "en-CA") => {
  const localDate = LocalDate.parse(ymd);
  return convert(localDate).toDate().toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
