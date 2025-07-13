import { timestamp } from "../timeframe";

type Day = {
  data: timestamp;
};

//[0, 30];
type Month = {
  days: Map<number, Day>;
};

//[0, 3]
type Quarter = {
  months: Map<number, Month>;
};

//[0, ∞]
type Year = {
  quarters: Map<number, Quarter>;
};

type Database = {
  years: Map<number, Year>;
};

export { Day, Month, Quarter, Year, Database };
