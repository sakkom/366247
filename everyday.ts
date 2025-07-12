import { Day } from "./timeframe";

type Everyday = {
  sleep: number;
  bath: number;
  eats: number;
  toilets: number;
  teeth: number;
  houseworks: number;
};

const dummyEveryday: Everyday = {
  sleep: 7.5 * 60 * 60 * 1000,
  bath: 30 * 60 * 1000,
  eats: 60 * 60 * 1000,
  toilets: 30 * 60 * 1000,
  teeth: 9 * 60 * 1000,
  houseworks: 30 * 60 * 1000,
};

function getEverydayTime(everyday: Everyday) {
  const everydaytime = Object.values(everyday).reduce(
    (sum, value) => sum + value,
    0,
  );

  const daytime = Day - everydaytime;

  return daytime;
}

// (() => {
//   console.log(getEverydayTime(dummyEveryday));
// })();
