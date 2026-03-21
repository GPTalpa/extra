"use client";

import "./home.scss";
import Image from "next/image";

import Item from "@ui/Item";
import { useEffect, useState } from "react";
import getProducts from "@utils/getProducts";
import { Products } from "@mytypes/products";
export default function Home() {
  const [data, setData] = useState<Products[] | null | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      const dataServ = await getProducts(4);
      setData(dataServ);
    }

    fetchData();
  }, []);

  console.log(data);

  return (
    <main>
      <section className="main__section">
        <div className="main__section--text">
          <h1>Цифровая платформа подбора, обучения и диагностики приборов</h1>
          <p>
            Быстрый подбор оборудования, справка по эксплуатации и сертификация
            специалистов в одном месте
          </p>
        </div>
        <div className="main__section__images">
          <div></div>

          <Item
            text="Открыть справку"
            image="help.webp"
            extraClass="blue"
            href="/help"
          />
          <Item
            text="Личный кабинет"
            image="profile.webp"
            extraClass="green"
            href="/profile"
          />
          <div></div>
          <div></div>
          <Item
            text="Подобрать прибор"
            image="filter.webp"
            extraClass="red"
            href="/selecting_device"
          />
        </div>
      </section>
      <section className="popular">
        <h2>Популярные приборы</h2>
        <div className="popular__items">
          {!data
            ? ""
            : data.map((elem) => {
                return (
                  <div className="popular__items--item-wrapper" key={elem.id}>
                    <div className="popular__items--item-image">
                      <Image
                        src={
                          elem.image_url[0]
                            ? `https://extrabackend.duckdns.org${elem.image_url[0]}`
                            : "/images/no-photo.png"
                        }
                        alt={elem.title}
                        width={114}
                        height={168}
                      />
                    </div>
                    <p>{elem.title}</p>
                  </div>
                );
              })}
        </div>
      </section>
    </main>
  );
}
