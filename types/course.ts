export type CourseBlock = {
  id: string;
  video_url: string;
  course_id: string;
  title: string;
  text_content: string;
};

export type CourseType = {
  title: string;
  description: string;
  id: string;
  level: string;
  progress: { completed: number; total: number; status: string } | null;
  level_label: string;
  audience_label: string;
  blocks: CourseBlock[];
};
