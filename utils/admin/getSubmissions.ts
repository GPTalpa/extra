import { get } from "@lib/api";

import { submissionsType } from "@mytypes/admin/submissionsType";

async function getSubmissions(id: string) {
  try {
    // const res: submissionsType = await get(`/tests/courses/${id}/submissions`);
    const res: submissionsType = await get(`/tests/blocks/${id}/submissions`);
    return res;
  } catch (err) {
    return null;
  }
}

export default getSubmissions;
