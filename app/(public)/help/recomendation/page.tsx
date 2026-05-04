"use client";

import "../style.scss";
import "./style.scss";
import Input from "@ui/Input";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDebounce } from "@hooks/useDebounce";
import getRecomendations from "@utils/getRecomendations";
import getRecomendationSearch from "@utils/getRecomendationSearch";
import { Recomendation as RecomendationType } from "@mytypes/recomendation";
import Link from "next/link";

const Recomendation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<RecomendationType[] | null | undefined>(
    undefined,
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    async function fetchData() {
      if (!debouncedSearchTerm) {
        const dataServ = await getRecomendations();
        setData(dataServ);
      }

      if (debouncedSearchTerm) {
        const dataServ = await getRecomendationSearch(debouncedSearchTerm);
        setData(dataServ);
      }
    }

    fetchData();
  }, [debouncedSearchTerm]);

  const handleInput = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <>
      <div className="recomendation">
        <Link className="help--back" href="/help/">
          <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
          Назад
        </Link>
        <div className="recomendation__header">
          <Input
            className="recomendation__header--input"
            placeholder="Поиск по названию..."
            onChange={handleInput}
            value={searchTerm}
          />
        </div>
        <div className="recomendation__content">
          {!data
            ? ""
            : data.map((elem) => {
                return (
                  <details className="faq__item" key={elem.id}>
                    <summary className="faq__summary">
                      <span className="faq__item--question">{elem.title}</span>
                      <span className="faq__chev" aria-hidden="true">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="33"
                          height="33"
                          viewBox="0 0 33 33"
                          fill="none"
                        >
                          <path
                            d="M1.06055 1.06055L30.7011 30.7008M30.7011 30.7008V1.06055M30.7011 30.7008H1.06055"
                            stroke="currentColor"
                            stroke-width="3"
                          />
                        </svg>
                      </span>
                    </summary>
                    <div className="faq__content">
                      <p>{elem.description}</p>
                    </div>
                  </details>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default Recomendation;
