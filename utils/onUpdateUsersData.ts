import { postPatch } from "@lib/api";

interface Data {
  password?: string;
  email?: string;
  role?: string;
  fullname?: string;
  image_url?: string;
}

async function onUpdateUsersData(data: Data) {
  try {
    const res = await postPatch(`/users/me`, {
      ...data,
    });
    return res;
  } catch (err) {
    return null;
  }
}

export default onUpdateUsersData;
