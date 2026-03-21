import { get } from "@lib/api";
import { Products } from "@mytypes/products";

async function getProductSearch(searchString?: string) {
  try {
    const res: Products[] = await get(`/products/search?q=${searchString}`);
    return res;
  } catch (err) {
    return null;
  }
}

export default getProductSearch;
