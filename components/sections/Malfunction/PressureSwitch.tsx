import { Malfunction } from "@mytypes/malfunction";
import getMalfunctions from "@utils/getMalfunctions";
import getMalfunctionSearch from "@utils/getMalfunctionSearch";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IMalfunction {
  handleClickMalfunction: (event: boolean, id: string) => void;
  input: string;
}

const PressureSwitch = ({ handleClickMalfunction, input }: IMalfunction) => {
  const [data, setData] = useState<Malfunction[] | null | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      if (!input) {
        const dataServ = await getMalfunctions();
        setData(dataServ);
      }

      if (input) {
        const dataServ = await getMalfunctionSearch(input);
        setData(dataServ);
      }
    }

    fetchData();
  }, [input]);

  return (
    <div className="malfunctiom__content">
      {!data
        ? ""
        : data.map((elem) => {
            return (
              <div
                className="malfunctiom__content__item"
                onClick={() => handleClickMalfunction(true, elem.id)}
                key={elem.id}
              >
                <div className="malfunctiom__content__item--left">
                  <p>{elem.title}</p>
                  <Image
                    src={`https://extrabackend.duckdns.org${elem.image}`}
                    width={112.4537353515625}
                    height={59.19719696044922}
                    alt=""
                  />
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
                    stroke-width="3"
                  />
                </svg>
              </div>
            );
          })}
    </div>
  );
};

export default PressureSwitch;
