export const API_URL = "https://extrabackend.duckdns.org/api/v1";

async function parseError(res: Response): Promise<string> {
  try {
    const data = await res.json();

    if (data.password) {
      return data.password[0];
    }

    return JSON.stringify(data);
  } catch {
    return "Ошибка запроса";
  }
}

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
    const message = await parseError(res);
    throw new Error(message);
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

  if (res.ok) {
    return res.json();
  }

  const err = await res.json().catch(() => ({}));
  throw new Error(err.message || "REQUEST_FAILED");
}
