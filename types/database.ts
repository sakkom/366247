import { timestamp } from "../timeframe";

type DayData = {
  study: timestamp;
};

//[1, 31];
type Month = {
  days: Map<number, DayData>;
};

//numberは[1, 3], [4, 6], [7, 9], [10, 12]
type Quarter = {
  months: Map<number, Month>;
};

//["Q1", "Q4"]
type Year = {
  quarters: Map<string, Quarter>;
};

//西暦
type Database = {
  years: Map<number, Year>;
};

export { DayData, Month, Quarter, Year, Database };
