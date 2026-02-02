// import { API_URL } from "lib/constants";
// import { fetcher } from "lib/fetcher";

// export async function getProducts() {
//   return fetcher(`${API_URL}/api/products`);
// }

// export async function createProduct(title: string, price: number) {
//   return fetcher("/api/admin/products", {
//     method: "POST",
//     body: JSON.stringify({ title, price }),
//   });
// }

// export const API_URL = "/api/proxy/api";
export const API_URL = "https://webcoder-app.ru/api";

export async function post<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Ошибка запроса");
  }

  return res.json();
}

export async function get<T>(url: string): Promise<T> {
  const res = await fetch(`${API_URL}${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    // if (res.status === 401) {
    // try {
    //   const result = await fetch(`${API_URL}/auth/refresh/`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({}),
    //     credentials: "include",
    //   });
    //   if (!result.ok) {
    //     throw new Error("Ошибка запроса");
    //   }
    //   return get(url);
    // } catch (err) {
    //   console.error("getUser error:", err);
    // }
    // }
    const err = await res.json().catch(() => ({ message: "Ошибка запроса" }));
    throw new Error(err.message || "Ошибка запроса");
  }

  return res.json();
}
