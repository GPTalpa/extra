export type CourseProgress = {
  completed: number;
  all_total: number;
  title: string;
  course_id: string;
  percent: number;
};

export type CoursesProgressResponse = CourseProgress[];
