export const API_URL = "https://webcoder-app.ru/api";

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function refreshToken(): Promise<boolean> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;

  refreshPromise = fetch(`${API_URL}/auth/refresh/`, {
    method: "POST",
    credentials: "include",
  })
    .then((res) => res.ok)
    .catch(() => false)
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });

  return refreshPromise;
}

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

  if (res.status === 401) {
    const refreshed = await refreshToken();

    if (refreshed) {
      const retry = await fetch(`${API_URL}${url}`, {
        method: "GET",
        credentials: "include",
      });

      if (retry.ok) {
        return retry.json();
      }
    }

    throw new Error("UNAUTHORIZED");
  }

  const err = await res.json().catch(() => ({}));
  throw new Error(err.message || "REQUEST_FAILED");
}
