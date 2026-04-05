"use client";

import Input from "@ui/Input";
import "./style.scss";

import Image from "next/image";
import { useEffect, useState } from "react";
import RecomendationDetail from "./RecomendationDetail";
import { useDebounce } from "@hooks/useDebounce";
import getRecomendations from "@utils/getRecomendations";
import getRecomendationSearch from "@utils/getRecomendationSearch";
import { Recomendation as RecomendationType } from "@mytypes/recomendation";

interface IRecomendation {
  handleBack: () => void;
}

const Recomendation = ({ handleBack }: IRecomendation) => {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<RecomendationType[] | null | undefined>(
    undefined,
  );
  const [openedId, setOpenedId] = useState<string | null>(null);

  const handleBackDetail = () => {
    setIsOpenDetail(false);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    async function fetchData() {
      if (!debouncedSearchTerm) {
        const dataServ = await getRecomendations();
        setData(dataServ);
      }

      if (debouncedSearchTerm) {
        const dataServ = await getRecomendationSearch(debouncedSearchTerm);
        setData(dataServ);
      }
    }

    fetchData();
  }, [debouncedSearchTerm]);

  const handleInput = (value: string) => {
    setSearchTerm(value);
  };

  const handleClick = (id: string) => {
    setOpenedId(id);
    setIsOpenDetail(true);
  };
  return (
    <>
      {!isOpenDetail && (
        <div className="recomendation">
          <button className="help--back" onClick={handleBack}>
            <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
            Назад
          </button>
          <div className="recomendation__header">
            <Input
              className="recomendation__header--input"
              placeholder="Поиск по названию..."
              onChange={handleInput}
              value={searchTerm}
            />
          </div>
          <div className="recomendation__content">
            {!data
              ? "Загрузка..."
              : data.map((item) => (
                  <div
                    className="recomendation__item"
                    onClick={() => handleClick(item.id)}
                    key={item.id}
                  >
                    <p className="recomendation__item--title">{item.title}</p>
                    <p className="recomendation__item--description">
                      {item.description}
                    </p>
                    {/* <div className="recomendation__item__image">
                      <Image
                        src="/images/rec2.png"
                        alt=""
                        width={490.423828125}
                        height={250.3058319091797}
                      />
                    </div> */}
                  </div>
                ))}

            {/* <div
              className="recomendation__item"
              onClick={() => setIsOpenDetail(true)}
            >
              <p className="recomendation__item--title">
                Лорем Ипсум - тип текста
              </p>
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
            <div
              className="recomendation__item"
              onClick={() => setIsOpenDetail(true)}
            >
              <p className="recomendation__item--title">
                Лорем Ипсум - тип текста
              </p>
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
            </div> */}
          </div>
        </div>
      )}
      {isOpenDetail && (
        <RecomendationDetail handleBackDetail={handleBackDetail} openedId={openedId}/>
      )}
    </>
  );
};

export default Recomendation;
