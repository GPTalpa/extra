import { get } from "@lib/api";
import { CourseType } from "@mytypes/course";

async function getCourses() {
  try {
    const res: CourseType[] = await get(`/courses`);
    return res;
  } catch (err) {
    return null;
  }
}

export default getCourses;
