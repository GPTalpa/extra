import { API_URL } from "lib/constants";
import { fetcher } from "lib/fetcher";

export async function getProducts() {
  return fetcher(`${API_URL}/api/products`);
}

// export async function createProduct(title: string, price: number) {
//   return fetcher("/api/admin/products", {
//     method: "POST",
//     body: JSON.stringify({ title, price }),
//   });
// }
