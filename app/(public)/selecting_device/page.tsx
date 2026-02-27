"use client";
import Input from "@ui/Input";
import "./style.scss";
import Image from "next/image";
import { useState } from "react";
import Device from "@sections/Device";

export default function SelectingDevice() {
  const [isOpenDevice, setIsOpenDevice] = useState(false);

  const handleBack = () => {
    setIsOpenDevice(false);
  };

  return (
    <main>
      {!isOpenDevice && (
        <section className="selectingDevice">
          <div className="selectingDevice__header">
            <button className="selectingDevice__header--filter">
              <Image src="/icon/filter.svg" alt="" width={24} height={24} />
            </button>
            <Input
              className="selectingDevice__header--input"
              placeholder="Поиск по названию прибора..."
            />
          </div>
          <div className="selectingDevice__content">
            <div className="selectingDevice__item">
              <div className="selectingDevice__item__wrapper">
                {" "}
                <div className="selectingDevice__item--image">
                  <Image
                    src="/images/item.webp"
                    alt=""
                    width={180}
                    height={265}
                  />
                </div>
                <p className="selectingDevice__item--description">
                  РДЭ-К-10-2.2 Реле давления воды электронное с изолированным
                  выходом, для насоса (1507150000)
                </p>
              </div>
              <button
                className="btn selectingDevice__item--btn"
                onClick={() => setIsOpenDevice(true)}
              >
                Подробнее
              </button>
            </div>
            <div className="selectingDevice__item">
              <div className="selectingDevice__item__wrapper">
                {" "}
                <div className="selectingDevice__item--image">
                  <Image
                    src="/images/item.webp"
                    alt=""
                    width={180}
                    height={265}
                  />
                </div>
                <p className="selectingDevice__item--description">
                  РДЭ-К-10-2.2 Реле давления воды электронное с изолированным
                  выходом, для насоса (1507150000)
                </p>
              </div>
              <button
                className="btn selectingDevice__item--btn"
                onClick={() => setIsOpenDevice(true)}
              >
                Подробнее
              </button>
            </div>
            <div className="selectingDevice__item">
              <div className="selectingDevice__item__wrapper">
                {" "}
                <div className="selectingDevice__item--image">
                  <Image
                    src="/images/item.webp"
                    alt=""
                    width={180}
                    height={265}
                  />
                </div>
                <p className="selectingDevice__item--description">
                  РДЭ-К-10-2.2 Реле давления воды электронное с изолированным
                  выходом, для насоса (1507150000)
                </p>
              </div>
              <button
                className="btn selectingDevice__item--btn"
                onClick={() => setIsOpenDevice(true)}
              >
                Подробнее
              </button>
            </div>
            <div className="selectingDevice__item">
              <div className="selectingDevice__item__wrapper">
                {" "}
                <div className="selectingDevice__item--image">
                  <Image
                    src="/images/item.webp"
                    alt=""
                    width={180}
                    height={265}
                  />
                </div>
                <p className="selectingDevice__item--description">
                  РДЭ-К-10-2.2 Реле давления воды электронное с изолированным
                  выходом, для насоса (1507150000)
                </p>
              </div>
              <button
                className="btn selectingDevice__item--btn"
                onClick={() => setIsOpenDevice(true)}
              >
                Подробнее
              </button>
            </div>
            <div className="selectingDevice__item">
              <div className="selectingDevice__item__wrapper">
                {" "}
                <div className="selectingDevice__item--image">
                  <Image
                    src="/images/item.webp"
                    alt=""
                    width={180}
                    height={265}
                  />
                </div>
                <p className="selectingDevice__item--description">
                  РДЭ-К-10-2.2 Реле давления воды электронное с изолированным
                  выходом, для насоса (1507150000)
                </p>
              </div>
              <button className="btn selectingDevice__item--btn">
                Подробнее
              </button>
            </div>
            <div className="selectingDevice__item">
              <div className="selectingDevice__item__wrapper">
                {" "}
                <div className="selectingDevice__item--image">
                  <Image
                    src="/images/item.webp"
                    alt=""
                    width={180}
                    height={265}
                  />
                </div>
                <p className="selectingDevice__item--description">
                  РДЭ-К-10-2.2 Реле давления воды электронное с изолированным
                  выходом, для насоса (1507150000)
                </p>
              </div>
              <button className="btn selectingDevice__item--btn">
                Подробнее
              </button>
            </div>
          </div>
        </section>
      )}
      {isOpenDevice && <Device handleBack={handleBack} />}
    </main>
  );
}
