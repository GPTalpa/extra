"use client";
import { useEffect, useRef, useState } from "react";
import "./style.scss";
import Input from "@ui/Input";
import ProgressDots from "@ui/ProgressDots";
import Course from "@sections/Course";
import { useDebounce } from "@hooks/useDebounce";
import { CourseType } from "@mytypes/course";
import getCourses from "@utils/getCourses";
import getCourseSearch from "@utils/getCourseSearch";
import postStartCourse from "@utils/postStartCourse";
import Link from "next/link";

export default function Learning() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isOpenCurse, setIsOpenCurse] = useState(false);
  const [data, setData] = useState<CourseType[] | null | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [openedId, setOpenedId] = useState<string | null>(null);
  const [typeLearning, settypeLearning] = useState("everyone");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    async function fetchData() {
      if (!debouncedSearchTerm) {
        const dataServ = await getCourses(typeLearning);
        setData(dataServ);
      }

      if (debouncedSearchTerm) {
        const dataServ = await getCourseSearch(debouncedSearchTerm);
        setData(dataServ);
      }
    }

    fetchData();
  }, [debouncedSearchTerm, typeLearning]);

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

  const handleOpenAndStartDevice = async (id: string) => {
    await postStartCourse(id);
  };

  const handleInput = (value: string) => {
    setSearchTerm(value);
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
            onChange={handleInput}
            value={searchTerm}
          />
          <div
            className="learning__header__filter"
            ref={scrollRef}
            onWheel={handleWheel}
          >
            <button
              className={`btn learning__header__filter__item ${typeLearning === "everyone" ? "active" : ""}`}
              onClick={() => settypeLearning("everyone")}
            >
              {typeLearning === "everyone" ? <span></span> : ""}
              Для всех
            </button>
            <button
              className={`btn learning__header__filter__item ${typeLearning === "installer" ? "active" : ""}`}
              onClick={() => settypeLearning("installer")}
            >
              {typeLearning === "installer" ? <span></span> : ""}
              Для Монтажников
            </button>
            <button
              className={`btn learning__header__filter__item ${typeLearning === "seller" ? "active" : ""}`}
              onClick={() => settypeLearning("seller")}
            >
              {typeLearning === "seller" ? <span></span> : ""}
              Для Продавцов
            </button>
            <button
              className={`btn learning__header__filter__item ${typeLearning === "serviceman" ? "active" : ""}`}
              onClick={() => settypeLearning("serviceman")}
            >
              {typeLearning === "serviceman" ? <span></span> : ""}
              Для Сервесников
            </button>
          </div>
          <div className="learning__content">
            {!data
              ? "Загрузка..."
              : data.map((elem) => {
                  return (
                    <div className="learning__item" key={elem.id}>
                      <p className="learning__item--title">
                        {elem.title}: уровень {elem.level_label}
                      </p>
                      <p className="learning__item--description">
                        {elem.description}
                      </p>
                      {elem.progress ? (
                        <div className="learning__item--dots">
                          <ProgressDots
                            completed={elem.progress.completed}
                            total={elem.progress.total}
                          />
                          <p className="learning__item--progress">
                            <span className="completed">
                              {elem.progress.completed}
                            </span>
                            /
                            <span className="total">{elem.progress.total}</span>
                          </p>
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="learning__item__btns">
                        {elem.progress?.status === "not_started" ? (
                          <Link
                            className="learning__item--btn"
                            onClick={() => handleOpenAndStartDevice(elem.id)}
                            href={`/learning/${elem.id}`}
                          >
                            Начать
                          </Link>
                        ) : (
                          <Link
                            className="learning__item--btn"
                            href={`/learning/${elem.id}`}
                          >
                            Продолжить
                          </Link>
                        )}

                        {/* <button className="learning__item--btn">
                          Отменить курс
                        </button> */}
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
      {isOpenCurse && <Course handleBack={handleBack} openedId={openedId} />}
    </main>
  );
}
