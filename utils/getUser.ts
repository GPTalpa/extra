import { get } from "@lib/api";
import { User } from "@mytypes/user";

async function getUser() {
  try {
    const res: User = await get(`/users/me/`);
    return res;
  } catch (err) {
    return null;
  }
}

export default getUser;
