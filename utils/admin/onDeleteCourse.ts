import { deleteRequest } from "@lib/api";


async function onDeleteCourse(id:string) {
  try {
    const res = await deleteRequest(`/courses/${id}`);
    return res;
  } catch (err) {
    return null;
  }
}

export default onDeleteCourse;
