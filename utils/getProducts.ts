import { get } from "@lib/api";
import { Products } from "@mytypes/products";

async function getProducts(limit?: number, offset?: number) {
  try {
    const res: Products[] = await get(
      `/products${limit ? `?limit=${limit}` : ""}${offset ? `&page=${offset}` : ""}`,
    );
    return res;
  } catch (err) {
    return [];
  }
}

export default getProducts;
