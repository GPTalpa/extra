import { post } from "@lib/api";

interface Data {
  title: string;
  block_type: string;
  text_content: string;
  video_url: string;
}

interface resBlockId {
  id: string;
}

async function createCourseBlock(id: string, data: Data) {
  try {
    const res: resBlockId = await post(`/courses/${id}/blocks`, { ...data });
    return res;
  } catch (err) {
    return null;
  }
}

export default createCourseBlock;
