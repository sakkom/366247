const getJanuaryQuater = (month: number) => Math.floor(month / 3);

const getAprilQuater = (month: number) => {
  const normal = getJanuaryQuater(month);
  return (normal + 3) % 4;
};

const getDayOfWeekAndMonth = (timestamp: number) => {
  const date = new Date(timestamp);
  return {
    dayOfWeek: date.getDay(),
    month: date.getMonth(),
  };
};

export { getJanuaryQuater, getAprilQuater, getDayOfWeekAndMonth };

// (() => {
//   for (let i = 0; i < 11; i++) {
//     console.log(getAprilQuater(i));
//   }
// })();
