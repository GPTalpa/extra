"use client";

import "../style.scss";
import "./style.scss";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Terms from "../page";
import getTerm from "@utils/getTerm";
import { useEffect, useState, Suspense } from "react";

function TermsDetailContent() {
  const [data, setData] = useState<Terms | null | undefined>(undefined);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      const dataServ = await getTerm(id);
      setData(dataServ);
    }
    fetchData();
  }, [id]);

  if (!data) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <div className="help__header">
        <Link href="/help/terms/" className="help--back">
          <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
          Назад
        </Link>
      </div>
      <div className="malfunction-detail">
        <div className="malfunction-detail__left">
          <div className="malfunction-detail__header">
            <p className="malfunction-detail--title">{data?.title}</p>
            <p className="malfunction-detail--description">
              {data?.description}
            </p>
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

export default function TermsDetail() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <TermsDetailContent />
    </Suspense>
  );
}
