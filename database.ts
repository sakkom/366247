type Day = {
  time: number;
};

type Week = {
  days: [Day, Day, Day, Day, Day, Day, Day];
};

type Month = {
  weeks: [Week, Week, Week, Week];
};

type Quarter = {
  months: [Month, Month, Month];
};

type Database = {
  years: number;
  Q0: Quarter[];
  Q1: Quarter[];
  Q2: Quarter[];
  Q3: Quarter[];
};
