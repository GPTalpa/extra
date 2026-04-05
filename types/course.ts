export type CourseType = {
  title: string;
  description: string;
  id: string;
  level: string;
  progress: { completed: number; total: number } | null;
};
