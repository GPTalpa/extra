import { postPatch } from "@lib/api";

interface Data {
  title?: string;
  block_type?: string;
  text_content?: string;
  video_url?: string;
}

interface resBlockId {
  id: string;
}

async function editCourseBlock(id: string, blockId: string, data: Data) {
  try {
    const res: resBlockId = await postPatch(
      `/courses/${id}/blocks/${blockId}`,
      {
        ...data,
      },
    );
    return res;
  } catch (err) {
    return null;
  }
}

export default editCourseBlock;
