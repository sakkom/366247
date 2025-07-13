// console.time("total");
// console.time("imports");
import { getAprilQuater, getDayOfWeekAndMonth } from "./utils/schedule";
import {
  AcademicQuarter,
  ScheduleStatus,
  MAX_STUDENT_YEARS,
  DailyPattern,
} from "./types/schedule";
import { WORK_SCHEDULE } from "./data/workSchedule";
import { ACADEMIC_SCHEDULE_2025 } from "./data/academicSchedule";
// console.timeEnd("imports");

function determineDailyPattern(
  isInLecture: boolean,
  isPartWork: boolean,
  isInExam: boolean,
  isNonPeriod: boolean,
): DailyPattern {
  if (isInLecture) {
    return isPartWork ? DailyPattern.PART_WORK_LECTURE : DailyPattern.LECTURE;
  }
  if (isInExam) {
    return isPartWork ? DailyPattern.PART_WORK_EXAM : DailyPattern.EXAM;
  }
  if (isNonPeriod) {
    return isPartWork ? DailyPattern.PART_WORK : DailyPattern.FULL_STUDY;
  }

  throw new Error("Invalid combination of parameters");
}

const isWorkingDay = (dayOfWeek: number) => WORK_SCHEDULE.fixedShift[dayOfWeek];

function checkAcademicPeriods(
  timestamp: number,
  academicSchedule: AcademicQuarter,
) {
  const lecture = academicSchedule.lecture;
  const exam = academicSchedule.exam;

  const isInLecture = lecture.start <= timestamp && timestamp <= lecture.end;
  const isInExam = exam.start <= timestamp && timestamp <= exam.end;

  return { isInLecture, isInExam };
}

function getScheduleStatus(
  timestamp: number,
  dayOfWeek: number,
  month: number,
) {
  const term = ACADEMIC_SCHEDULE_2025[getAprilQuater(month)];

  const { isInLecture, isInExam } = checkAcademicPeriods(timestamp, term);
  const isPartTimeJob = isWorkingDay(dayOfWeek);
  const isNonPeriod = !isInLecture && !isInExam;

  return {
    isInLecture,
    isInExam,
    isPartTimeJob,
    isNonPeriod,
  } as ScheduleStatus;
}

function getDailyPattern(timestamp: number, yearIndex: number) {
  if (yearIndex > MAX_STUDENT_YEARS) throw new Error("Invalid year index.");

  const { dayOfWeek, month } = getDayOfWeekAndMonth(timestamp);
  const { isInLecture, isPartTimeJob, isInExam, isNonPeriod } =
    getScheduleStatus(timestamp, dayOfWeek, month);

  return determineDailyPattern(
    isInLecture,
    isPartTimeJob,
    isInExam,
    isNonPeriod,
  );
}

// (() => {
//   console.time("getDailyPattern");
//   const dailyPattern = getDailyPattern(Date.now(), 0);
//   console.timeEnd("getDailyPattern");
//   console.log(dailyPattern);

//   console.timeEnd("total");
// })();

//test
// function testSpecificDates() {
//   console.log("\n🎯 特定日付テスト");
//   console.log("=".repeat(40));

//   const testCases = [
//     {
//       date: new Date(2025, 4, 15),
//       description: "1学期講義中（木曜）",
//     },
//     {
//       date: new Date(2025, 6, 15),
//       description: "2学期講義中（火曜）",
//     },
//     {
//       date: new Date(2025, 7, 25),
//       description: "2学期試験中（月曜）",
//     },
//     {
//       date: new Date(2025, 6, 5),
//       description: "期間外（土曜）",
//     },
//   ];

//   testCases.forEach(({ date, description }) => {
//     const result = getTodayStatus(date.getTime(), 0);
//     const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];

//     console.log(
//       `${date.getMonth() + 1}/${date.getDate()}(${dayOfWeek}): ${description}`,
//     );
//     console.log(`   結果: ${DailyPattern[result!]}`);
//   });
// }
// testSpecificDates();
