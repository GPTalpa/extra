import { get } from "@lib/api";
import { courseTest } from "@mytypes/courseTest";

async function getCourseTest(id: string | null | undefined) {
  try {
    const res: courseTest[] = await get(`/tests/blocks/${id}/questions`);
    return res;
  } catch (err) {
    return null;
  }
}

export default getCourseTest;
