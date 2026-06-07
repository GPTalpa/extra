"use client";

import "../style.scss";
import "./style.scss";

import Image from "next/image";
import { JSX, Suspense, useEffect, useState } from "react";
import { Products } from "@mytypes/products";
import getProduct from "@utils/getProduct";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function MalfunctionContent() {
  const [data, setData] = useState<Products | null | undefined>(undefined);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;
    async function fetchData() {
      const dataServ = await getProduct(id);
      setData(dataServ);
    }
    fetchData();
  }, [id]);

  // Определяем тип для данных характеристики
  type CharacteristicValue =
    | string
    | number
    | boolean
    | object
    | null
    | undefined;
  type CharacteristicsData = Record<string, CharacteristicValue>;

  const renderCharacteristics = (
    data: CharacteristicsData,
    parentKey: string = "",
  ): JSX.Element[] => {
    if (!data) {
      return []; // Возвращаем пустой массив вместо undefined
    }

    return Object.entries(data).flatMap(([key, value]) => {
      // Формируем отображаемое имя ключа (красивое форматирование)
      const displayKey = parentKey ? `${parentKey} > ${key}` : key;

      // Если значение - объект, рекурсивно обрабатываем его
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        return renderCharacteristics(value as CharacteristicsData, displayKey);
      }

      // Если значение === true → используем только ключ
      if (value === true) {
        return (
          <div key={displayKey} className="device__content__char__item">
            <p className="device__content__char--value">{displayKey}</p>
          </div>
        );
      }

      // Пропускаем false значения (не возвращаем ничего)
      if (value === false) {
        return []; // Возвращаем пустой массив вместо undefined
      }

      // Для всех остальных значений (числа, строки, null)
      return (
        <div key={displayKey} className="device__content__char__item">
          <p className="device__content__char--name">{displayKey}:</p>
          <div></div>
          <p className="device__content__char--value">{String(value)}</p>
        </div>
      );
    });
  };

  function formatDescription(text: string) {
    // Разбиваем перед каждым "– ", который идет после точки с запятой или новой строки
    return text.replace(/(\s*– )/g, "<br>$1");
  }

  if (!data) {
    return <div>Загрузка...</div>;
  }

  return (
    <section className="device">
      <div className="device__header">
        <Link className="device--back" href="/selecting_device/">
          <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
          Назад
        </Link>
      </div>
      <div className="device__content">
        <div className="device__content__left">
          <div className="device__content__char__item device__content__char__item--article">
            <p className="device__content__char--name">Артикул:</p>
            <div></div>
            <p className="device__content__char--value">
              {data?.article ? String(data.article) : "Загрузка..."}
            </p>
          </div>
          <p className="device__content--title">
            {data ? data.title : "Загрузка..."}
          </p>
          <p
            className="device__content--desciprion"
            dangerouslySetInnerHTML={{
              __html: data
                ? formatDescription(data?.description)
                : "Загрузка...",
            }}
          />
          <div className="device__content__char">
            <p className="device__content__char--title">Характеристики</p>
            <div className="device__content__char__container">
              {data
                ? renderCharacteristics(data?.attributes as CharacteristicsData)
                : "Загрузка..."}
            </div>
          </div>
        </div>
        <div className="device__content__right">
          <div className="device__content__right--image">
            <img
              src={
                data?.image_url[0]
                  ? `https://extrabackend.duckdns.org${data.image_url[0]}`
                  : "/images/no-photo.png"
              }
            />
          </div>

          <div className="device__content__btns">
            <Link
              href={data ? data.documentation : "#"}
              className="btn"
              target="_blank"
            >
              <Image src="/icon/gear.svg" alt="" width={22} height={22} />
              Схемы подключения
            </Link>
            <Link
              href={data ? data.documentation : "#"}
              className="btn"
              target="_blank"
            >
              <Image src="/icon/document.svg" alt="" width={20} height={25} />
              Документация
            </Link>
            <Link
              href={data ? data.documentation : "#"}
              className="btn"
              target="_blank"
            >
              <Image src="/icon/document.svg" alt="" width={20} height={25} />
              Страница товара
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const Device = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <MalfunctionContent />
    </Suspense>
  );
};

export default Device;
