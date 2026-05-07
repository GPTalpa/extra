import { get } from "@lib/api";

type Terms = {
  id: string;
  title: string;
  description: string;
};

async function getTerms(limit?: number, offset?: number) {
  try {
    const res: Terms[] = await get(
      `/terms${limit ? `?limit=${limit}` : ""}${offset ? `&page=${offset}` : ""}`,
    );
    return res;
  } catch (err) {
    return [];
  }
}

export default getTerms;
