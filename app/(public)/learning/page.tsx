"use client";
import { useEffect, useRef, useState } from "react";
import "./style.scss";
import Image from "next/image";
import Malfunction from "@sections/Malfunction";
import Faq from "@sections/Faq";
import Recomendation from "@sections/Recomendation";
import Terms from "@sections/Terms";
import Input from "@ui/Input";
import ProgressDots from "@ui/ProgressDots";
import Course from "@sections/Course";
import { useDebounce } from "@hooks/useDebounce";
import { CourseType } from "@mytypes/course";
import getCourses from "@utils/getCourses";

export default function Learning() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isOpenCurse, setIsOpenCurse] = useState(false);
  const [data, setData] = useState<CourseType[] | null | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    async function fetchData() {
      if (!debouncedSearchTerm) {
        const dataServ = await getCourses();
        setData(dataServ);
      }

      // if (debouncedSearchTerm) {
      //   const dataServ = await getCourses(debouncedSearchTerm);
      //   setData(dataServ);
      // }
    }

    fetchData();
  }, [debouncedSearchTerm]);

  console.log(data);

  const [typeLearning, settypeLearning] = useState("type1");

  const handleWheel = (e: React.WheelEvent) => {
    const el = scrollRef.current;
    if (!el) return;

    const canScroll = el.scrollWidth > el.clientWidth;

    if (!canScroll) return;

    e.preventDefault(); // блокируем вертикальный скролл страницы
    el.scrollLeft += e.deltaY;
  };

  // const [openedHelp, setOpenedHelp] = useState("");

  const handleBack = () => {
    setIsOpenCurse(false);
  };

  const getLvl = (level: string) => {
    switch (level) {
      case "beginner":
        return "Новичок";
        break;

      default:
        break;
    }
  };

  // const handleSetterOpenedHelp = (arg: string) => {
  //   setIsOpenHelp(true);
  //   setOpenedHelp(arg);
  // };

  // const chooseElem = () => {
  //   switch (openedHelp) {
  //     case "malfunction":
  //       return <Malfunction handleBack={handleBack} />;
  //       break;

  //     case "faq":
  //       return <Faq handleBack={handleBack} />;
  //       break;

  //     case "recomendation":
  //       return <Recomendation handleBack={handleBack} />;
  //       break;
  //     case "terms":
  //       return <Terms handleBack={handleBack} />;
  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <main>
      {!isOpenCurse && (
        <section className="learning">
          <Input
            className="learning__header--input"
            placeholder="Введите серийный номер, проблему или название..."
          />
          <div
            className="learning__header__filter"
            ref={scrollRef}
            onWheel={handleWheel}
          >
            <button
              className={`btn learning__header__filter__item ${typeLearning === "type1" ? "active" : ""}`}
              onClick={() => settypeLearning("type1")}
            >
              {typeLearning === "type1" ? <span></span> : ""}
              Реле давления
            </button>
            <button
              className={`btn learning__header__filter__item ${typeLearning === "type2" ? "active" : ""}`}
              onClick={() => settypeLearning("type2")}
            >
              {typeLearning === "type2" ? <span></span> : ""}
              Устр-ва плавного впуска
            </button>
            <button className="btn learning__header__filter__item">
              Устр-ва защиты насоса
            </button>
            <button className="btn learning__header__filter__item">
              Устр-ва защиты насоса
            </button>{" "}
            <button className="btn learning__header__filter__item">
              Устр-ва защиты насоса
            </button>{" "}
            <button className="btn learning__header__filter__item">
              Устр-ва защиты насоса
            </button>
          </div>
          <div className="learning__content">
            {!data
              ? "Загрузка..."
              : data.map((elem) => {
                  return (
                    <div className="learning__item" key={elem.id}>
                      <p className="learning__item--title">
                        {elem.title}: уровень {getLvl(elem.level)}
                      </p>
                      <p className="learning__item--description">
                        {elem.description}
                      </p>
                      <div className="learning__item--dots">
                        <ProgressDots completed={1} total={18} />
                        <p className="learning__item--progress">
                          <span className="completed">2</span>/
                          <span className="total">16</span>
                        </p>
                      </div>

                      <div className="learning__item__btns">
                        <button
                          className="learning__item--btn"
                          onClick={() => setIsOpenCurse(true)}
                        >
                          Продолжить
                        </button>
                        <button className="learning__item--btn">
                          Отменить курс
                        </button>
                      </div>
                    </div>
                  );
                })}
            {/* <div className="learning__item in-progress">
              <p className="learning__item--title">
                Курс для монтажника: уровень Новичок
              </p>
              <p className="learning__item--description">
                Лорем Ипсум — это тип текста-заполнителя, обычно используемый в
                дизайне и издательском деле для заполнения пространства на
                странице...
              </p>
              <div className="learning__item--dots">
                <ProgressDots completed={1} total={18} />
                <p className="learning__item--progress">
                  <span className="completed">2</span>/
                  <span className="total">16</span>
                </p>
              </div>

              <div className="learning__item__btns">
                <button
                  className="learning__item--btn"
                  onClick={() => setIsOpenCurse(true)}
                >
                  Продолжить
                </button>
                <button className="learning__item--btn">Отменить курс</button>
              </div>
            </div>
            <div className="learning__item new">
              <p className="learning__item--title">
                Курс для монтажника: уровень Новичок
              </p>
              <p className="learning__item--description">
                Лорем Ипсум — это тип текста-заполнителя, обычно используемый в
                дизайне и издательском деле для заполнения пространства на
                странице...
              </p>
              <div className="learning__item--dots">
                <ProgressDots completed={1} total={18} />
                <p className="learning__item--progress">
                  <span className="completed">2</span>/
                  <span className="total">16</span>
                </p>
              </div>

              <div className="learning__item__btns">
                <button
                  className="learning__item--btn"
                  onClick={() => setIsOpenCurse(true)}
                >
                  Продолжить
                </button>
                <button className="learning__item--btn">Отменить курс</button>
              </div>
            </div>
            <div className="learning__item">
              <p className="learning__item--title">
                Курс для монтажника: уровень Новичок
              </p>
              <p className="learning__item--description">
                Лорем Ипсум — это тип текста-заполнителя, обычно используемый в
                дизайне и издательском деле для заполнения пространства на
                странице...
              </p>
              <div className="learning__item--dots">
                <ProgressDots completed={1} total={18} />
                <p className="learning__item--progress">
                  <span className="completed">2</span>/
                  <span className="total">16</span>
                </p>
              </div>

              <div className="learning__item__btns">
                <button
                  className="learning__item--btn"
                  onClick={() => setIsOpenCurse(true)}
                >
                  Продолжить
                </button>
                <button className="learning__item--btn">Отменить курс</button>
              </div>
            </div> */}
          </div>
        </section>
      )}
      {isOpenCurse && <Course handleBack={handleBack} />}
    </main>
  );
}
