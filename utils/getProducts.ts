import { get } from "@lib/api";
import { Products } from "@mytypes/products";

async function getProducts(limit?: number) {
  try {
    const res: Products[] = await get(
      `/products${limit ? `?limit=${limit}` : ""}`,
    );
    return res;
  } catch (err) {
    return null;
  }
}

export default getProducts;
