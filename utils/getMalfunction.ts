import { get } from "@lib/api";
import { Malfunction } from "@mytypes/malfunction";

async function getMalfunction(id: string | null | undefined) {
  try {
    const res: Malfunction = await get(`/error/${id}`);
    return res;
  } catch (err) {
    return null;
  }
}

export default getMalfunction;
