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

const Terms = () => {
  const [data, setData] = useState<Terms[] | null | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      const dataServ = await getTerms();
      setData(dataServ);
    }

    fetchData();
  }, []);

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
                  href={`/help/terms/${elem.id}`}
                >
                  <p className="terms--title">{elem.title}</p>
                  {/* <p className="terms--description">{elem.description}</p> */}
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default Terms;
