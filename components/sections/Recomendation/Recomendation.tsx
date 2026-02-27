"use client";

import Input from "@ui/Input";
import "./style.scss";

import Image from "next/image";

interface IRecomendation {
  handleBack: () => void;
}

const Recomendation = ({ handleBack }: IRecomendation) => {
  return (
    <div className="recomendation">
      <button className="help--back" onClick={handleBack}>
        <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
        Назад
      </button>
      <div className="recomendation__header">
        <button className="recomendation__header--filter">
          <Image src="/icon/filter.svg" alt="" width={24} height={24} />
        </button>
        <Input
          className="recomendation__header--input"
          placeholder="Поиск по названию..."
        />
      </div>
      <div className="recomendation__content">
        <div className="recomendation__item">
          <p className="recomendation__item--title">Лорем Ипсум - тип текста</p>
          <p className="recomendation__item--description">
            Лорем Ипсум — это тип текста-заполнителя, обычно используемый в
            дизайне и издательском деле для заполнения пространства на
            странице...
          </p>
          <div className="recomendation__item__image">
            <Image
              src="/images/rec1.png"
              alt=""
              width={490.423828125}
              height={250.3058319091797}
            />
          </div>
        </div>
        <div className="recomendation__item">
          <p className="recomendation__item--title">Лорем Ипсум - тип текста</p>
          <p className="recomendation__item--description">
            Лорем Ипсум — это тип текста-заполнителя, обычно используемый в
            дизайне и издательском деле для заполнения пространства на
            странице...
          </p>
          <div className="recomendation__item__image">
            <Image
              src="/images/rec2.png"
              alt=""
              width={490.423828125}
              height={250.3058319091797}
            />
          </div>
        </div>
        <div className="recomendation__item">
          <p className="recomendation__item--title">Лорем Ипсум - тип текста</p>
          <p className="recomendation__item--description">
            Лорем Ипсум — это тип текста-заполнителя, обычно используемый в
            дизайне и издательском деле для заполнения пространства на
            странице...
          </p>
          <div className="recomendation__item__image">
            <Image
              src="/images/rec1.png"
              alt=""
              width={490.423828125}
              height={250.3058319091797}
            />
          </div>
        </div>
        <div className="recomendation__item">
          <p className="recomendation__item--title">Лорем Ипсум - тип текста</p>
          <p className="recomendation__item--description">
            Лорем Ипсум — это тип текста-заполнителя, обычно используемый в
            дизайне и издательском деле для заполнения пространства на
            странице...
          </p>
          <div className="recomendation__item__image">
            <Image
              src="/images/rec2.png"
              alt=""
              width={490.423828125}
              height={250.3058319091797}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recomendation;
