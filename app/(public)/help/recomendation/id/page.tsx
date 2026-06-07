"use client";

import "../../style.scss";
import "../style.scss";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Recomendation } from "@mytypes/recomendation";
import getRecomendation from "@utils/getRecomendation";
import { useEffect, useState, Suspense } from "react";

function RecomendationDetailContent() {
  const [data, setData] = useState<Recomendation | null | undefined>(undefined);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    async function fetchData() {
      const dataServ = await getRecomendation(id);
      setData(dataServ);
    }
    fetchData();
  }, [id]);

  function addLineBreaksAfterSentences(text: string) {
    const result = text
      // Вставляем перевод после точки, если дальше буква или цифра
      // .replace(/\.\s+([A-ZА-ЯЁ\d])/g, ".\n$1")
      // Вставляем перевод перед цифрой с точкой
      .replace(/(\d+\.\s+)/g, "\n$1");

    return result;
  }

  if (!data) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <div className="help__header">
        <Link href="/help/malfunction" className="help--back">
          <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
          Назад
        </Link>
      </div>
      <div className="malfunction-detail">
        <div className="malfunction-detail__left">
          <div className="malfunction-detail__header">
            <p className="malfunction-detail--title">{data?.title}</p>
            <p
              className="malfunction-detail--description"
              dangerouslySetInnerHTML={{
                __html: data
                  ? addLineBreaksAfterSentences(data?.description)
                  : "Загрузка...",
              }}
            ></p>
          </div>
        </div>
        {/* <div className="malfunction-detail__right">
          <Image
            src={`https://extrabackend.duckdns.org${data.image}`}
            width={293.689697265625}
            height={154.60231018066406}
            alt={data.title}
          />
        </div> */}
      </div>
    </>
  );
}
export default function RecomendationDetail() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <RecomendationDetailContent />
    </Suspense>
  );
}
