import { get } from "@lib/api";
import { Recomendation } from "@mytypes/recomendation";

async function getRecomendationSearch(searchString?: string) {
  try {
    const res: Recomendation[] = await get(
      `/recommendation/search?q=${searchString}`,
    );
    return res;
  } catch (err) {
    return null;
  }
}

export default getRecomendationSearch;
