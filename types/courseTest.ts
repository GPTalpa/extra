export type courseTest = {
  block_id: string;
  id: string;
  text: string;
  options: Option[];
};

export type Option = {
  id: string;
  text: string;
  order_index: number;
};

export type CourseTestResult = {
  questions: TestQuestion[];
  progress: { completed: number; total: number };
  correct_count: number;
  incorrect_count: number;
  completed_at: string;
};

export type TestQuestion = {
  question_id: string;
  text: string;
  status: string;
  user_answer: string;
};
