import { get } from "@lib/api";

type Terms = {
  id: string;
  title: string;
  description: string;
};

async function getTerm(id: string) {
  try {
    const res: Terms = await get(`/terms/${id}`);

    return res;
  } catch (err) {
    return null;
  }
}

export default getTerm;
