import { Malfunction } from "@mytypes/malfunction";
import getMalfunction from "@utils/getMalfunction";
import getMalfunctions from "@utils/getMalfunctions";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Recomendation as RecomendationType } from "@mytypes/recomendation";
import "../../style.scss";
import "../style.scss";
import getRecomendations from "@utils/getRecomendations";
import getRecomendation from "@utils/getRecomendation";

interface RecomendationDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const recommedations = await getRecomendations();

    if (!recommedations || !Array.isArray(recommedations)) {
      return [];
    }

    return recommedations.map((item: RecomendationType) => ({
      id: String(item.id),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function RecomendationDetail({
  params,
}: RecomendationDetailProps) {
  const { id } = await params;

  // Получаем данные на сервере
  const data = await getRecomendation(id);

  // Если данные не найдены - показываем 404
  if (!data) {
    notFound();
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
