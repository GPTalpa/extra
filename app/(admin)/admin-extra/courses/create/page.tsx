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

  return (
    <main>
      <Link
        className="learning__item--btn learning__item--btn--header"
        href="/admin-extra/courses/create"
      >
        Создать курс
      </Link>
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
                      <div className="learning__item__btns">
                        <button className="learning__item--btn">
                          Редактировать
                        </button>

                        <button className="learning__item--btn">
                          Удалить курс
                        </button>
                      </div>
                    </div>
                  );
                })}
          </div>
        </section>
      )}
      {isOpenCurse && <Course handleBack={handleBack} openedId={openedId} />}
    </main>
  );
}
