"use client";

import { useEffect, useState } from "react";
import "./style.scss";
import Image from "next/image";
import getTerms from "@utils/getTermins";

interface ITerms {
  handleBack: () => void;
}

type Terms = {
  id: string;
  title: string;
  description: string;
};

const Terms = ({ handleBack }: ITerms) => {
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
      <button className="help--back" onClick={handleBack}>
        <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
        Назад
      </button>

      <div className="terms__content">
        {!data
          ? ""
          : data.map((elem) => {
              return (
                <div className="terms__item" key={elem.id}>
                  <p className="terms--title">{elem.title}</p>
                  <p className="terms--description">{elem.description}</p>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Terms;
