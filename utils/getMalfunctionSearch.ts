import { get } from "@lib/api";
import { Malfunction } from "@mytypes/malfunction";

async function getMalfunctionSearch(searchString?: string) {
  try {
    const res: Malfunction[] = await get(`/error/search?q=${searchString}`);
    return res;
  } catch (err) {
    return null;
  }
}

export default getMalfunctionSearch;
