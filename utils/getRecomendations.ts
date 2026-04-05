import { get } from "@lib/api";
import { Recomendation } from "@mytypes/recomendation";

async function getRecomendations() {
  try {
    const res: Recomendation[] = await get(`/recommendation`);
    return res;
  } catch (err) {
    return null;
  }
}

export default getRecomendations;
