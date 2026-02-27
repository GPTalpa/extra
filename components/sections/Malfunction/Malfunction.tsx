import Input from "@ui/Input";
import "./style.scss";

import Image from "next/image";
import { useState, useRef } from "react";
import PressureSwitch from "./PressureSwitch";
import MalfunctionDetail from "./MalfunctionDetail";

interface IMalfunction {
  handleBack: () => void;
}

const Malfunction = ({ handleBack }: IMalfunction) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [typeMalfunctiom, setTypeMalfunctiom] = useState("type1");
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  const handleWheel = (e: React.WheelEvent) => {
    const el = scrollRef.current;
    if (!el) return;

    const canScroll = el.scrollWidth > el.clientWidth;

    if (!canScroll) return;

    e.preventDefault(); // блокируем вертикальный скролл страницы
    el.scrollLeft += e.deltaY;
  };

  const handleClickMalfunction = (action: boolean) => {
    console.log(action);
    setIsOpenDetail(action);
  };

  const chooseFilter = () => {
    switch (typeMalfunctiom) {
      case "type1":
        return (
          <PressureSwitch handleClickMalfunction={handleClickMalfunction} />
        );
        break;

      case "type2":
        return <></>;
        break;

      default:
        break;
    }
  };

  return (
    <>
      {" "}
      {!isOpenDetail && (
        <div className="malfunctiom">
          <div className="help__header">
            <button className="help--back" onClick={handleBack}>
              <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
              Назад
            </button>
          </div>
          <div className="malfunctiom__header">
            <Input
              className="malfunctiom__header--input"
              placeholder="Введите серийный номер, проблему или название..."
            />
            <div
              className="malfunctiom__header__filter"
              ref={scrollRef}
              onWheel={handleWheel}
            >
              <button
                className={`btn malfunctiom__header__filter__item ${typeMalfunctiom === "type1" ? "active" : ""}`}
                onClick={() => setTypeMalfunctiom("type1")}
              >
                {typeMalfunctiom === "type1" ? <span></span> : ""}
                Реле давления
              </button>
              <button
                className={`btn malfunctiom__header__filter__item ${typeMalfunctiom === "type2" ? "active" : ""}`}
                onClick={() => setTypeMalfunctiom("type2")}
              >
                {typeMalfunctiom === "type2" ? <span></span> : ""}
                Устр-ва плавного впуска
              </button>
              <button className="btn malfunctiom__header__filter__item">
                Устр-ва защиты насоса
              </button>
              <button className="btn malfunctiom__header__filter__item">
                Устр-ва защиты насоса
              </button>{" "}
              <button className="btn malfunctiom__header__filter__item">
                Устр-ва защиты насоса
              </button>{" "}
              <button className="btn malfunctiom__header__filter__item">
                Устр-ва защиты насоса
              </button>
            </div>
          </div>
          {chooseFilter()}
        </div>
      )}
      {isOpenDetail && (
        <MalfunctionDetail handleClickMalfunction={handleClickMalfunction} />
      )}
    </>
  );
};

export default Malfunction;
