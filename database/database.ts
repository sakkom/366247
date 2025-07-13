import { timestamp } from "../timeframe";
import { SYSTEM_START_DAY } from "../data/me";
import { db } from "./index";
import { DayData, Month, Quarter } from "../types/database";
import { getDataKeys } from "./utils";

function recordDailyStudy(studyDate: timestamp, studyTime: number) {
  try {
    const { yearKey, quarterKey, monthKey, dayKey } = getDataKeys(studyDate);
    const monthObj = buildPath(yearKey, quarterKey, monthKey);
    monthObj.days.set(dayKey, { study: studyTime } as DayData);
    return monthObj.days.has(dayKey);
  } catch {
    return false;
  }
}

function buildPath(year: number, quarter: string, month: number): Month {
  const yearObj =
    db.years.get(year) ??
    (() => {
      const y = { quarters: new Map<string, Quarter>() };
      db.years.set(year, y);
      return y;
    })();

  const quarterObj =
    yearObj.quarters.get(quarter) ??
    (() => {
      const q = { months: new Map<number, Month>() };
      yearObj.quarters.set(quarter, q);
      return q;
    })();

  const monthObj =
    quarterObj.months.get(month) ??
    (() => {
      const m = { days: new Map<number, DayData>() };
      quarterObj.months.set(month, m);
      return m;
    })();

  return monthObj;
}
