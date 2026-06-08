import { post } from "@lib/api";

interface Data {
  title: string;
  description: string;
  level: string;
  audience: string;
}

interface resId {
  id: string;
}

async function createCourse(data: Data) {
  try {
    const res: resId = await post(`/courses`, { ...data });
    return res;
  } catch (err) {
    return null;
  }
}

export default createCourse;
