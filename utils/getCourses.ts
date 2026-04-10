import { get } from "@lib/api";
import { CourseType } from "@mytypes/course";

async function getCourses(type?: string) {
  try {
    const res: CourseType[] = await get(`/courses${type ? `?q=${type}` : ""}`);
    return res;
  } catch (err) {
    return null;
  }
}

export default getCourses;
