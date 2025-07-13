import { Day, Month, Quarter, Database, Year } from "./types/database";
import { timestamp } from "./timeframe";
import { getJanuaryQuater } from "./utils/schedule";
import { getRedisClient } from "./redis";

const month: Month = {
  days: new Map<number, Day>(),
};

const quarter: Quarter = {
  months: new Map<number, Month>(),
};

const year: Year = {
  quarters: new Map<number, Quarter>(),
};

const database: Database = {
  // startDay: timestamp,
  years: new Map<number, Year>(),
};

type user = {
  startSystem: timestamp;
};

const me: user = {
  startSystem: new Date(2025, 6, 13).getTime(),
};

const getYearIndex = (targetYear: number) => {
  const systemStartYear = new Date(me.startSystem).getFullYear();
  return targetYear - systemStartYear;
};

const getTargetDateInfo = (targetDate: timestamp) => {
  const date = new Date(targetDate);
  const targetYear = date.getFullYear();
  const targetMonth = date.getMonth();
  const targetDay = date.getDate();

  return {
    targetYear,
    targetMonth,
    targetDay,
  };
};

function getIndexs(targetDate: timestamp) {
  const { targetYear, targetMonth, targetDay } = getTargetDateInfo(targetDate);

  const yearIndex = getYearIndex(targetYear);
  const quarterIndex = getJanuaryQuater(targetMonth);
  const monthIndex = targetMonth % 3;
  const dayIndex = targetDay;

  return { yearIndex, quarterIndex, monthIndex, dayIndex };
}

async function recordDailyStudy(studyDate: timestamp, studyTime: number) {}

// (() => {
//   quarter.months.set(0, month);
//   year.quarters.set(2, quarter);
//   database.years.set(0, year);

//   const { dayIndex, monthIndex, quarterIndex, yearIndex } = getIndexs(
//     Date.now(),
//   );

//   database.years
//     .get(yearIndex)
//     ?.quarters.get(quarterIndex)
//     ?.months.get(monthIndex)
//     ?.days.set(dayIndex, { data: 10000 });

//   const dayData = database.years
//     .get(yearIndex)
//     ?.quarters.get(quarterIndex)
//     ?.months.get(monthIndex)
//     ?.days.get(dayIndex);

//   console.log(dayData);
// })();
