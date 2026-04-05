import { get } from "@lib/api";
import { CourseType } from "@mytypes/course";

async function getCourseSearch(searchString?: string) {
  try {
    const res: CourseType[] = await get(`/courses/search?q=${searchString}`);
    return res;
  } catch (err) {
    return null;
  }
}

export default getCourseSearch;
