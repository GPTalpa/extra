import { get } from "@lib/api";

import { summaryType } from "@mytypes/admin/summaryType";

async function getUsersSummary() {
  try {
    const res: summaryType = await get(`/users/summary`);
    return res;
  } catch (err) {
    return null;
  }
}

export default getUsersSummary;
