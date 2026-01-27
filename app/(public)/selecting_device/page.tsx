// import { Metadata } from "next";
import "./style.scss";
import Image from "next/image";

import Input from "@ui/Input";
import { API_URL } from "@lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// export const metadata: Metadata = {
//   title: aliciaMountPageMeta.title,
//   description: aliciaMountPageMeta.description,
//   keywords: aliciaMountPageMeta.keywords,
//   alternates: {
//     canonical: "",
//   },
//   openGraph: {
//     type: "",
//     title: "",
//     description: "",
//     url: "",
//     siteName: "",
//     locale: "",
//     images: [
//       {
//         url: "",
//         width: 1200,
//         height: 630,
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "",
//     description: "",
//     images: [""],
//   },
// };

async function getUser() {
  const cookieStore = await cookies(); // <- напрямую объект, await не нужен
  const cookieHeader = cookieStore.get("accessToken")?.value; // <- только accessToken

  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      cookie: cookieHeader ? `accessToken=${cookieHeader}` : "",
    },
    cache: "no-store", // всегда свежие данные
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function SelectingDevice() {
  const data = await getUser();
  if (!data?.user) {
    redirect("/auth");
  }
  return (
    <main>
      <section>
        <div className="navigation">
          <button className="navigation--btn">
            <Image src="/icon/filter.svg" height={24} width={24} alt="Фильтр" />
          </button>
          <Input
            className="navigation--search-bar"
            placeholder="Поиск по названию прибора..."
          />
        </div>
        <div className="devices"></div>
      </section>
    </main>
  );
}
