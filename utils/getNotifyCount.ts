import { get } from "@lib/api";
import { NotifyCount } from "@mytypes/NotifyCount";

async function getNotifyCount() {
  try {
    const res: NotifyCount = await get(`/notifications/unread-count`);
    return res;
  } catch (err) {
    return null;
  }
}

export default getNotifyCount;
