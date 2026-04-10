import { post } from "@lib/api";

async function postStartCourse(id: string | null | undefined) {
  try {
    const res = await post(`/courses/${id}/enroll`, {});
    return res;
  } catch (err) {
    return null;
  }
}

export default postStartCourse;
