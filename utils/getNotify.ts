import { get } from "@lib/api";
import { Notify } from "@mytypes/notify";

async function getNotify() {
  try {
    const res: Notify[] = await get(`/notifications/`);
    return res;
  } catch (err) {
    return null;
  }
}

export default getNotify;
