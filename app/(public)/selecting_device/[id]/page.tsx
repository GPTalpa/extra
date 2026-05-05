import "../style.scss";
import "./style.scss";

import Image from "next/image";
import { JSX } from "react";
import { Products } from "@mytypes/products";
import getProduct from "@utils/getProduct";
import Link from "next/link";
import { notFound } from "next/navigation";
import getProducts from "@utils/getProducts";

interface IDevice {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const products = await getProducts();

    if (!products || !Array.isArray(products)) {
      return [];
    }

    return products.map((item: Products) => ({
      id: String(item.id),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

const Device = async ({ params }: IDevice) => {
  const { id } = await params;

  // Получаем данные на сервере
  const data = await getProduct(id);

  // Если данные не найдены - показываем 404
  if (!data) {
    notFound();
  }

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
              {data.article ? String(data.article) : "Загрузка..."}
            </p>
          </div>
          <p className="device__content--title">
            {data ? data.title : "Загрузка..."}
          </p>
          <p className="device__content--desciprion">
            {data ? data?.description : "Загрузка..."}
          </p>
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
                data.image_url[0]
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
};

export default Device;
