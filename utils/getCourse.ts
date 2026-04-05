import { get } from "@lib/api";
import { CourseType } from "@mytypes/course";

async function getCourse(id: string | null | undefined) {
  try {
    const res: CourseType = await get(`/courses/${id}/blocks/`);
    return res;
  } catch (err) {
    return null;
  }
}

export default getCourse;
