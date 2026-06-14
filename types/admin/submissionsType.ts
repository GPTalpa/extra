export type submissionsType = {
  id: string;
  user_id: string;
  block_id: string;
  submitted_at: string;
  score: number;
  max_score: number;
  is_graded: boolean;
  graded_by: string;
  admin_comment: string;
  answers: [
    {
      id: string;
      question_id: string;
      selected_answer_id: string;
      text_answer: string;
    },
  ];
};
