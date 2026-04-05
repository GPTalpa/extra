import "./style.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import Image from "next/image";
import { JSX, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import styles from "./Gallery.module.scss";
import { Products } from "@mytypes/products";
import getProduct from "@utils/getProduct";
import Link from "next/link";

const images = [
  "/images/item.webp",
  "/images/item.webp",
  "/images/item.webp",
  "/images/item.webp",
  "/images/item.webp",
  "/images/item.webp",
  "/images/item.webp",
  "/images/item.webp",
];

interface IDevice {
  handleBack: () => void;
  openedId: string | null;
}

const Device = ({ handleBack, openedId }: IDevice) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [data, setData] = useState<Products | null | undefined>(undefined);
  const images = data?.image_url;

  useEffect(() => {
    async function fetchData() {
      const dataServ = await getProduct(openedId);
      setData(dataServ);
    }

    fetchData();
  }, [openedId]);

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
        <button className="device--back" onClick={handleBack}>
          <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
          Назад
        </button>
      </div>
      <div className="device__content">
        <div className="device__content__left">
          <p className="device__content--title">
            {data ? data.title : "Загрузка..."}
          </p>
          <div className="device__content__char">
            <p className="device__content__char--title">Характеристики</p>
            <div className="device__content__char__container">
              {data
                ? renderCharacteristics(data?.attributes as CharacteristicsData)
                : "Загрузка..."}
            </div>
          </div>
          <p className="device__content--desciprion">
            {data ? data?.description : "Загрузка..."}
          </p>
          <div className="device__content__btns">
            <Link href={data ? data.documentation : "#"} className="btn">
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
          </div>
        </div>
        <div className="device__content__right">
          {images ? (
            <div className={styles.gallery}>
              {/* Большая картинка */}
              <Swiper
                modules={[Navigation, Thumbs]}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                className={styles.main}
              >
                {images.map((src, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={`https://extrabackend.duckdns.org${src}`}
                      alt={`image-${i}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Миниатюры */}
              <Swiper
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                slidesPerView={7}
                spaceBetween={10}
                watchSlidesProgress
                className={styles.thumbs}
              >
                {images.map((src, i) => (
                  <SwiperSlide key={i} className={styles.thumb}>
                    <img
                      src={`https://extrabackend.duckdns.org${src}`}
                      alt={`thumb-${i}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            "Загрузка..."
          )}
        </div>
      </div>
    </section>
  );
};

export default Device;
