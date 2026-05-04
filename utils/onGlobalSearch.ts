import { get } from "@lib/api";
import { SearchResponse } from "@mytypes/search";

async function onGlobalSearch(q?: string) {
  try {
    const res: SearchResponse = await get(`/search${q ? `?q=${q}` : ""}}`);
    return res;
  } catch (err) {
    return err;
  }
}

export default onGlobalSearch;
