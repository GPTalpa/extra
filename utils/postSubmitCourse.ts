import { post } from "@lib/api";

async function postSubmitCourse(
  id: string | null | undefined,
  answers: Array<{ question_id: string; selected_answer_id: string }>,
) {
  try {
    const res = await post(`/tests/blocks/${id}/submit`, { answers });
    return res;
  } catch (err) {
    return null;
  }
}

export default postSubmitCourse;
