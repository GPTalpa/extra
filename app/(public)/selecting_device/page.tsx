"use client";
import Input from "@ui/Input";
import "./style.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import Device from "@sections/Device";
import { Products } from "@mytypes/products";
import getProducts from "@utils/getProducts";
import { useDebounce } from "@hooks/useDebounce";
import getProductSearch from "@utils/getProductSearch";

export default function SelectingDevice() {
  const [isOpenDevice, setIsOpenDevice] = useState(false);
  const [openedId, setOpenedId] = useState<string | null>(null);
  const [data, setData] = useState<Products[] | null | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    async function fetchData() {
      if (!debouncedSearchTerm) {
        const dataServ = await getProducts();
        setData(dataServ);
      }

      if (debouncedSearchTerm) {
        const dataServ = await getProductSearch(debouncedSearchTerm);
        setData(dataServ);
      }
    }

    fetchData();
  }, [debouncedSearchTerm]);

  const handleBack = () => {
    setIsOpenDevice(false);
  };

  const handleOpenDevice = (id: string) => {
    setOpenedId(id);
    setIsOpenDevice(true);
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     const dataServ = await getProductSearch(debouncedSearchTerm);
  //     setData(dataServ);
  //   }

  //   fetchData();
  // }, [debouncedSearchTerm]);

  const handleInput = (value: string) => {
    setSearchTerm(value);
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
              onChange={handleInput}
              value={searchTerm}
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
                            src={
                              elem.image_url[0]
                                ? `https://extrabackend.duckdns.org${elem.image_url[0]}`
                                : "/images/no-photo.png"
                            }
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
                        onClick={() => handleOpenDevice(elem.id)}
                      >
                        Подробнее
                      </button>
                    </div>
                  );
                })}
          </div>
        </section>
      )}
      {isOpenDevice && <Device handleBack={handleBack} openedId={openedId} />}
    </main>
  );
}
