// @utils/getMalfunctions.ts
import { get } from "@lib/api";
import { Malfunction } from "@mytypes/malfunction";

export default async function getMalfunctions(): Promise<Malfunction[]> {
  try {
    const data = await get(`/error`);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error in getMalfunctions:", error);
    return [];
  }
}
