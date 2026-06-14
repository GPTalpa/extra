import { postPatch } from "@lib/api";

interface Data {
  title: string;
  description: string;
  level: string;
  audience: string;
}

interface resId {
  id: string;
}

async function editCourse(id: string, data: Data) {
  try {
    const res: resId = await postPatch(`/courses/${id}`, { ...data });
    return res;
  } catch (err) {
    return null;
  }
}

export default editCourse;
