"use client";
import "./style.scss";
import "../style.scss";

import { useEffect, useState } from "react";

import Image from "next/image";
import getTerms from "@utils/getTermins";
import Link from "next/link";

type Terms = {
  id: string;
  title: string;
  description: string;
};

const ITEMS_PER_PAGE = 9;

const Terms = () => {
  const [data, setData] = useState<Terms[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const dataServ = await getTerms();
      setData(dataServ || []);
    }

    fetchData();
  }, []);

  const loadMore = async () => {
    setIsLoadingMore(true);
    const nextOffset = offset + 1;
    const newData = await getTerms(ITEMS_PER_PAGE, nextOffset);
    setData((prev) => [...(prev || []), ...newData]);
    setOffset(nextOffset);
    setIsLoadingMore(false);
  };

  return (
    <div className="terms">
      <Link className="help--back" href="/help/">
        <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
        Назад
      </Link>

      <div className="terms__content">
        {!data
          ? ""
          : data.map((elem) => {
              return (
                <Link
                  className="terms__item"
                  key={elem.id}
                  href={`/help/terms/id?id=${elem.id}`}
                >
                  <p className="terms--title">{elem.title}</p>
                  {/* <p className="terms--description">{elem.description}</p> */}
                </Link>
              );
            })}
      </div>

      <button
        onClick={loadMore}
        disabled={isLoadingMore}
        className="btn btn--active terms--btn-more"
      >
        {isLoadingMore ? "Загрузка..." : "Загрузить еще"}
      </button>
    </div>
  );
};

export default Terms;
