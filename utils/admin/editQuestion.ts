import { postPatch } from "@lib/api";

type QuestionOption = {
  text: string;
  order_index: number;
  is_correct: boolean;
};

type CreateQuestionPayload = {
  text: string;
  question_type?: string;
  options: QuestionOption[];
  answer_text?: string;
};

async function editQuestion(id: string, data: CreateQuestionPayload) {
  try {
    const res = await postPatch(`/tests/questions/${id}`, data);
    return res;
  } catch (err) {
    return null;
  }
}

export default editQuestion;
