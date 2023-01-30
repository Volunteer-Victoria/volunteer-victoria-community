import { DateTime } from "luxon";

export const formatYMD = (ymd: string, locale = "en-CA") => {
  const localDate = DateTime.fromFormat(ymd, "yyyy-MM-dd", { zone: "local" });
  return localDate.toLocaleString(DateTime.DATE_MED);
};
