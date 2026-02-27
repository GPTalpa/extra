import "./style.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import styles from "./Gallery.module.scss";

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
}

const Device = ({ handleBack }: IDevice) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
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
            РДЭ-К-10-2.2 Реле давления воды электронное с изолированным выходом,
            для насоса (1507150000)
          </p>
          <div className="device__content__char">
            <p className="device__content__char--title">Характеристики</p>
            <div className="device__content__char__container">
              <div className="device__content__char__item">
                <p className="device__content__char--name">Артикул:</p>
                <div></div>
                <p className="device__content__char--value">181741474010</p>
              </div>
              <div className="device__content__char__item">
                <p className="device__content__char--name">Серия прибора:</p>
                <div></div>
                <p className="device__content__char--value">РДЭ-К</p>
              </div>
              <div className="device__content__char__item">
                <p className="device__content__char--name">
                  Рабочее напряжение:
                </p>
                <div></div>
                <p className="device__content__char--value">230 В ± 10%</p>
              </div>
              <div className="device__content__char__item">
                <p className="device__content__char--name">Серия прибора:</p>
                <div></div>
                <p className="device__content__char--value">РДЭ-К</p>
              </div>
              <div className="device__content__char__item">
                <p className="device__content__char--name">
                  Рабочее напряжение:
                </p>
                <div></div>
                <p className="device__content__char--value">230 В ± 10%</p>
              </div>
            </div>
          </div>
          <p className="device__content--desciprion">
            Лорем Ипсум — это тип текста-заполнителя, обычно используемый в
            дизайне и издательском деле для заполнения пространства на странице
            и создания впечатления о том, как будет выглядеть конечный контент.
            Лорем Ипсум на русском языке происходит от латинского текста
            римского философа Цицерона и используется с 1960-х годов.
          </p>
          <div className="device__content__btns">
            <button className="btn">
              <Image src="/icon/gear.svg" alt="" width={22} height={22} />
              Схемы подключения
            </button>
            <button className="btn">
              <Image src="/icon/document.svg" alt="" width={20} height={25} />
              Документация
            </button>
          </div>
        </div>
        <div className="device__content__right">
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
                  <img src={src} alt={`image-${i}`} />
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
                  <img src={src} alt={`thumb-${i}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Device;
