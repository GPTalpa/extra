"use client";

import "./style.scss";

import Image from "next/image";

interface IRecomendationDetail {
  handleBackDetail: () => void;
}

const RecomendationDetail = ({ handleBackDetail }: IRecomendationDetail) => {
  return (
    <div className="recomendation-detail">
      <button className="help--back" onClick={handleBackDetail}>
        <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
        Назад
      </button>
      <div className="recomendation-detail__content">
        <p className="recomendation-detail--title">
          Лорем Ипсум — это тип текста-заполнителя, обычно используемый в
          дизайне и издательском деле
        </p>
        <ul>
          <li>Оглавление</li>
          <li>Содержание</li>
          <li>Лорем Ипсум</li>
          <li>Еще что-то</li>
          <li>И так далее</li>
        </ul>
        <p className="recomendation-detail--text">
          Лорем Ипсум — это тип текста-заполнителя, обычно используемый в
          дизайне и издательском деле для заполнения пространства на странице и
          создания впечатления о том, как будет выглядеть конечный контент.
          Лорем Ипсум на русском языке происходит от латинского текста римского
          философа Цицерона.
        </p>
        <div className="recomendation-detail--image">
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
        </p>
      </div>
    </div>
  );
};

export default RecomendationDetail;
