import { get, post } from "@lib/api";
import { User } from "@mytypes/user";

async function getUser() {
  try {
    const res: User = await get(`/auth/me/`);
    return res;
  } catch (err) {
    return null;
  }
}

export default getUser;
