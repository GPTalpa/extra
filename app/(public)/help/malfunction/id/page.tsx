"use client";
import "../../style.scss";
import "../style.scss";

import { Malfunction } from "@mytypes/malfunction";
import getMalfunction from "@utils/getMalfunction";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useEffect, useState, Suspense } from "react";

function MalfunctionContent() {
  const [data, setData] = useState<Malfunction | null | undefined>(undefined);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      const dataServ = await getMalfunction(id);
      setData(dataServ);
    }
    fetchData();
  }, [id]);

  function addLineBreaksAfterSentences(text: string) {
    const result = text.replace(/(\d+\.\s+)/g, "\n$1");
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
        <div className="malfunction-detail__right">
          <Image
            src={`https://extrabackend.duckdns.org${data?.image}`}
            width={293.689697265625}
            height={154.60231018066406}
            alt={data?.title ? data.title : "Изображение ошибки"}
          />
        </div>
      </div>
    </>
  );
}

export default function MalfunctionDetail() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <MalfunctionContent />
    </Suspense>
  );
}
