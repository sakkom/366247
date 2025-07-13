//[0, 1]
const MAX_STUDENT_YEARS = 1;

enum DailyPattern {
  PART_WORK_LECTURE = "アルバイトと講義",
  PART_WORK_EXAM = "アルバイトと試験",
  LECTURE = "講義",
  EXAM = "試験",
  PART_WORK = "アルバイト",
  FULL_STUDY = "独習",
}

type AcademicQuarter = {
  lecture: { start: number; end: number };
  exam: { start: number; end: number };
};

type ScheduleStatus = {
  isInLecture: boolean;
  isInExam: boolean;
  isPartTimeJob: boolean;
  isNonPeriod: boolean;
};

export { MAX_STUDENT_YEARS, DailyPattern, AcademicQuarter, ScheduleStatus };
