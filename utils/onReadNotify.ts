import { postPatch } from "@lib/api";

async function onReadNotify(id: string) {
  try {
    const res = await postPatch(`/notifications/${id}/read/`, {});
    return res;
  } catch (err) {
    return null;
  }
}

export default onReadNotify;
