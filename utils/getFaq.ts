import { get } from "@lib/api";

type Faq = {
  id: string;
  question: string;
  answer: string;
};

async function getFaq() {
  try {
    const res: Faq[] = await get(`/faq`);
    return res;
  } catch (err) {
    return null;
  }
}

export default getFaq;
