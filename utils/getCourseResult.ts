import { get } from "@lib/api";
import { CourseTestResult } from "@mytypes/courseTest";

async function getCourseResult(
  courseid: string | null | undefined,
  blockid: string | null | undefined,
) {
  try {
    const res: CourseTestResult = await get(
      `/courses/${courseid}/blocks/${blockid}/test-results`,
    );
    return res;
  } catch (err) {
    return null;
  }
}

export default getCourseResult;
