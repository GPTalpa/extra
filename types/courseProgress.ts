export type CourseProgress = {
  course_id: string;
  course_title: string;
  total_blocks: number;
  completed_blocks: number;
  percent: number;
};

export type CoursesProgressResponse = CourseProgress[];