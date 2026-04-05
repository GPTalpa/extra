"use client";

import { useEffect, useState } from "react";
import "./style.scss";

import Image from "next/image";
import { Recomendation } from "@mytypes/recomendation";
import getRecomendation from "@utils/getRecomendation";

interface IRecomendationDetail {
  handleBackDetail: () => void;
  openedId: string | null;
}

const RecomendationDetail = ({
  handleBackDetail,
  openedId,
}: IRecomendationDetail) => {
  const [data, setData] = useState<Recomendation | null | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      const dataServ = await getRecomendation(openedId);
      setData(dataServ);
    }

    fetchData();
  }, [openedId]);

  return (
    <div className="recomendation-detail">
      <button className="help--back" onClick={handleBackDetail}>
        <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
        Назад
      </button>
      {!data ? (
        "Загрузка..."
      ) : (
        <div className="recomendation-detail__content">
          <p className="recomendation-detail--title">{data.title}</p>
          {/* <ul>
            <li>Оглавление</li>
            <li>Содержание</li>
            <li>Лорем Ипсум</li>
            <li>Еще что-то</li>
            <li>И так далее</li>
          </ul> */}
          <p className="recomendation-detail--text">{data.description}</p>
          {/* <div className="recomendation-detail--image">
            <Image
              src="/images/recomendation-detail.png"
              alt=""
              width={855.6524047851562}
              height={424.1769714355469}
            />
            <p>Описание фото 23</p>
          </div>
          <h3>Лорем заголовок</h3>
          <p className="recomendation-detail--text">
            Текст-заполнитель имеет решающее значение для дизайнеров, чтобы
            визуализировать макеты, не отвлекаясь от реального контента. Он
            позволяет сосредоточиться на эстетике и структуре, обеспечивая
            сбалансированную презентацию.{" "}
          </p>
          <p className="recomendation-detail--text">
            Чистый макет повышает креативность какая то ссылка и облегчает
            эксперименты с типографикой, цветами и интервалами. Эта практика
            оптимизирует процесс проектирования и помогает заинтересованным
            сторонам представить потенциал проекта.
          </p>
          <p className="recomendation-detail--text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            illo nobis placeat, esse magni impedit laboriosam necessitatibus
            animi, ut mollitia architecto doloremque reiciendis, quibusdam
            quisquam nulla itaque. Unde, perspiciatis officiis.
          </p> */}
        </div>
      )}
    </div>
  );
};

export default RecomendationDetail;
