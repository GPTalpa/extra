import { get, post } from "@lib/api";
import { User } from "@mytypes/user";

async function refresh() {
  try {
    const res: Response = await post(`/auth/refresh/`, {});
    return res;
  } catch (err) {
    console.error("getUser error:", err);
    return null;
  }
}

export default refresh;
