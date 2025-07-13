import { timestamp } from "../timeframe";
import { getJanuaryQuater } from "../utils/schedule";

const getQuarterString = (month: number) => `Q${getJanuaryQuater(month) + 1}`;

function getDataKeys(targetDate: timestamp) {
  const date = new Date(targetDate);

  const yearKey = date.getFullYear();
  const quarterKey = getQuarterString(date.getMonth());
  const monthKey = date.getMonth() + 1;
  const dayKey = date.getDate();

  return { yearKey, quarterKey, monthKey, dayKey };
}

export { getQuarterString, getDataKeys };
