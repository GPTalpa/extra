// import { Metadata } from "next";
import "./style.scss";
import Image from "next/image";
import Link from "next/link";

import Input from "@ui/Input";

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

export default function SelectingDevice() {
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
