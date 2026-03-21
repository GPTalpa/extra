import { get } from "@lib/api";
import { Products } from "@mytypes/products";

async function getProduct(id: string | null) {
  try {
    const res: Products = await get(`/products/${id}`);
    return res;
  } catch (err) {
    return null;
  }
}

export default getProduct;
