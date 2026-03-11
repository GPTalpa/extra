import { get } from "@lib/api";

type Terms = {
  id: string;
  title: string;
  description: string;
};

async function getTerms() {
  try {
    const res: Terms[] = await get(`/terms`);
    return res;
  } catch (err) {
    return null;
  }
}

export default getTerms;
