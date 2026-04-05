import { get } from "@lib/api";
import { Recomendation } from "@mytypes/recomendation";

async function getRecomendation(id: string | null | undefined) {
  try {
    const res: Recomendation = await get(`/recommendation/${id}`);
    return res;
  } catch (err) {
    return null;
  }
}

export default getRecomendation;
