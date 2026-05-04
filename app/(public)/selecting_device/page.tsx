"use client";
import Input from "@ui/Input";
import "./style.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Products } from "@mytypes/products";
import getProducts from "@utils/getProducts";
import { useDebounce } from "@hooks/useDebounce";
import getProductSearch from "@utils/getProductSearch";
import Link from "next/link";

const ITEMS_PER_PAGE = 9;

export default function SelectingDevice() {
  const [data, setData] = useState<Products[] | null | undefined>(undefined);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [offset, setOffset] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    async function fetchData() {
      if (!debouncedSearchTerm) {
        const dataServ = await getProducts(9, 1);
        setData(dataServ);
      }

      if (debouncedSearchTerm) {
        const dataServ = await getProductSearch(debouncedSearchTerm);
        setData(dataServ);
      }
    }

    fetchData();
  }, [debouncedSearchTerm]);

  const handleInput = (value: string) => {
    setSearchTerm(value);
  };

  const loadMore = async () => {
    setIsLoadingMore(true);
    const nextOffset = offset + 1;
    const newData = await getProducts(ITEMS_PER_PAGE, nextOffset);
    setData((prev) => [...(prev || []), ...newData]);
    setOffset(nextOffset);
    setIsLoadingMore(false);
  };

  return (
    <main>
      {data ? (
        <section className="selectingDevice">
          <div className="selectingDevice__header">
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
                    <Link
                      className="selectingDevice__item"
                      key={elem.id}
                      href={`/selecting_device/${elem.id}`}
                      target="_blank"
                    >
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
                    </Link>
                  );
                })}
          </div>
          {!debouncedSearchTerm && (
            <button
              onClick={loadMore}
              disabled={isLoadingMore}
              className="btn btn--active selectingDevice--btn-more"
            >
              {isLoadingMore ? "Загрузка..." : "Загрузить еще"}
            </button>
          )}
        </section>
      ) : (
        "Загрузка..."
      )}
    </main>
  );
}
