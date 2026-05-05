"use client";

import { Malfunction } from "@mytypes/malfunction";
import getMalfunctions from "@utils/getMalfunctions";
import getMalfunctionSearch from "@utils/getMalfunctionSearch";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./style.scss";

interface IMalfunction {
  input: string;
}

const PressureSwitch = ({ input }: IMalfunction) => {
  const [data, setData] = useState<Malfunction[] | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        if (!input) {
          const dataServ = await getMalfunctions();
          setData(dataServ);
        } else {
          const dataServ = await getMalfunctionSearch(input);
          setData(dataServ);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [input]);

  if (loading) {
    return <div className="malfunctiom__content">Загрузка...</div>;
  }

  return (
    <div className="malfunctiom__content">
      {!data || data.length === 0 ? (
        <div>Ничего не найдено</div>
      ) : (
        data.map((elem) => (
          <Link
            className="malfunctiom__content__item"
            href={`/help/malfunction/${elem.id}`}
            key={elem.id}
          >
            <div className="malfunctiom__content__item--left">
              <p>{elem.title}</p>
              <div className="malfunctiom__content__item--left--image">
                <Image
                  src={`https://extrabackend.duckdns.org${elem.image}`}
                  width={112.4537353515625}
                  height={59.19719696044922}
                  alt={elem.title}
                />
              </div>
            </div>
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
                strokeWidth="3"
              />
            </svg>
          </Link>
        ))
      )}
    </div>
  );
};

export default PressureSwitch;
