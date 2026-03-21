import { get } from "@lib/api";
import { Malfunction } from "@mytypes/malfunction";

async function getMalfunctions() {
  try {
    const res: Malfunction[] = await get(`/error`);
    return res;
  } catch (err) {
    return null;
  }
}

export default getMalfunctions;
