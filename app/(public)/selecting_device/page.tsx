"use client";
import Input from "@ui/Input";
import "./style.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import Device from "@sections/Device";
import { Products } from "@mytypes/products";
import getProducts from "@utils/getProducts";

export default function SelectingDevice() {
  const [isOpenDevice, setIsOpenDevice] = useState(false);
  const [data, setData] = useState<Products[] | null | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      const dataServ = await getProducts();
      setData(dataServ);
    }

    fetchData();
  }, []);

  console.log(data);
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
            {!data
              ? ""
              : data.map((elem) => {
                  return (
                    <div className="selectingDevice__item" key={elem.id}>
                      <div className="selectingDevice__item__wrapper">
                        {" "}
                        <div className="selectingDevice__item--image">
                          <Image
                            src={elem.image_url[0]}
                            alt=""
                            width={180}
                            height={265}
                          />
                        </div>
                        <p className="selectingDevice__item--description">
                          {elem.title}
                        </p>
                      </div>
                      <button
                        className="btn selectingDevice__item--btn"
                        onClick={() => setIsOpenDevice(true)}
                      >
                        Подробнее
                      </button>
                    </div>
                  );
                })}
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
