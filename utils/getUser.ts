import { API_URL } from "@lib/api";
import { cookies } from "next/headers";

async function getUser() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: {
        cookie: cookieHeader ? cookieHeader : "",
      },
      cache: "no-store", // всегда свежие данные
    });
    return res.json();
  } catch {
    return null;
  }
}

export default getUser;
