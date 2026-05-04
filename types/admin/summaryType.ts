export type summaryType = {
  total_users: number;
  total_tests_passed: number;
  course_stats: {
    count: number;
    percent: number;
  };
  new_users_stats: {
    count: number;
    percent: number;
  };
};
