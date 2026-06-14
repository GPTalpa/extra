import { post } from "@lib/api";

type QuestionOption = {
  text: string;
  order_index: number;
  is_correct: boolean;
};

type CreateQuestionPayload = {
  text: string;
  question_type: string;
  options: QuestionOption[];
  answer_text?: string;
};

async function createQuestion(blockId: string, data: CreateQuestionPayload) {
  try {
    const res = await post(`/tests/blocks/${blockId}/questions`, data);
    return res;
  } catch (err) {
    return null;
  }
}

export default createQuestion;
