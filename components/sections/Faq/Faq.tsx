"use client";

import { useEffect, useState } from "react";
import "./style.scss";

import Image from "next/image";
import getFaq from "@utils/getFaq";

interface IFaq {
  handleBack: () => void;
}

type Faq = {
  id: string;
  question: string;
  answer: string;
};

const Faq = ({ handleBack }: IFaq) => {
  const [data, setData] = useState<Faq[] | null | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      const dataServ = await getFaq();
      setData(dataServ);
    }

    fetchData();
  }, []);

  return (
    <div className="help-faq">
      <div className="help__header">
        <button className="help--back" onClick={handleBack}>
          <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
          Назад
        </button>
      </div>
      <div className="help-faq__content">
        <h2>FAQ</h2>
        <div className="faq_right">
          {!data
            ? ""
            : data.map((elem) => {
                return (
                  <details className="faq__item" key={elem.id}>
                    <summary className="faq__summary">
                      <span className="faq__item--question">
                        {elem.question}
                      </span>
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
                      <p>{elem.answer}</p>
                    </div>
                  </details>
                );
              })}

        </div>
      </div>
    </div>
  );
};

export default Faq;
