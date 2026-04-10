import { get } from "@lib/api";
import { CourseProgress } from "@mytypes/courseProgress";

async function getProfileCourses() {
  try {
    const res: CourseProgress[] = await get(`/profile/courses-progress`);
    return res;
  } catch (err) {
    return null;
  }
}

export default getProfileCourses;
