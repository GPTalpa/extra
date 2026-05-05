import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../style.scss";
import "./style.scss";
import getTerms from "@utils/getTermins";
import Terms from "../page";
import getTerm from "@utils/getTerm";

interface TermsDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const terms = await getTerms();

    if (!terms || !Array.isArray(terms)) {
      return [];
    }

    return terms.map((item: Terms) => ({
      id: String(item.id),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function TermsDetail({ params }: TermsDetailProps) {
  const { id } = await params;

  // Получаем данные на сервере
  const data = await getTerm(id);

  if (!data) {
    notFound();
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
            <p className="malfunction-detail--title">{data.title}</p>
            <p className="malfunction-detail--description">
              {data.description}
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
