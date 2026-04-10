import "./style.scss";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CourseTestResult } from "@mytypes/courseTest";
import getCourseResult from "@utils/getCourseResult";

interface ICourse {
  handleBack: () => void;
  courseId: string | undefineds;
  blockId: string | undefined;
}

const CourseResult = ({ handleBack, courseId, blockId }: ICourse) => {
  const [data, setData] = useState<CourseTestResult | null | undefined>(
    undefined,
  );

  useEffect(() => {
    async function fetchData() {
      const dataServ = await getCourseResult(courseId, blockId);
      setData(dataServ);
    }

    fetchData();
  }, [courseId, blockId]);

  console.log(data);

  const isCorrect = (name: string) => {
    switch (name) {
      case "Верно":
        return true;
        break;
      case "Неверно":
        return false;
        break;

      default:
        break;
    }
  };

  const transformData = (data: string | undefined) => {
    if (!data) {
      return;
    }
    const date = new Date(data);

    const day = date.getDate();

    const months = [
      "янв.",
      "фев.",
      "мар.",
      "апр.",
      "мая",
      "июн.",
      "июл.",
      "авг.",
      "сен.",
      "окт.",
      "ноя.",
      "дек.",
    ];
    const month = months[date.getMonth()];

    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const endDate = new Date(date.getTime() + 5 * 60000);
    const endHours = endDate.getHours().toString().padStart(2, "0");
    const endMinutes = endDate.getMinutes().toString().padStart(2, "0");

    return `${day} ${month} ${year} в ${hours}:${minutes}-${endHours}:${endMinutes}`;
  };

  const onHandleMain = () => {
    window.location.reload();
  };
  return (
    <div className="course-result">
      <button className="course--back" onClick={handleBack}>
        <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
        Назад
      </button>
      <p className="course-result__content--label">
        <span style={{ color: "#FA2828" }}>Часть 3</span> Мои ответы
      </p>
      <div className="course-result__header">
        <div className="course-result__header__block">
          <p className="course-result__header--testTheme-head">Тест на тему</p>
          <div className="course-result__header--testTheme">
            Обучение основам работы монтажника
          </div>
          <div className="course-result__header--progress">
            {data?.progress.completed}/{data?.progress.total}
          </div>
        </div>
        <div className="course-result__header__block course-result__header__block--test-res">
          <div className="course-result__header__answers course-result__header__answers--true">
            <div className="course-result__header__answers--dec course-result__header__answers--dec--true"></div>
            <span>
              <p style={{ color: "#FFFFFF80" }}>Правильно</p>
              <p>{data?.correct_count}</p>
            </span>
          </div>
          <div className="course-result__header__answers course-result__header__answers--false">
            <div className="course-result__header__answers--dec course-result__header__answers--dec--false"></div>
            <span>
              <p style={{ color: "#FFFFFF80" }}>Неправильно</p>
              <p>{data?.incorrect_count}</p>
            </span>
          </div>
        </div>
        <div className="course-result__header__block course-result__header__block__time-res">
          <p>Тест пройден</p>
          <p style={{ fontWeight: 600, color: "white" }}>
            {transformData(data?.completed_at)}
          </p>
        </div>
      </div>
      <div className="course-result__content">
        {!data?.questions
          ? "Загрузка..."
          : data.questions.map((elem, index) => {
              console.log(elem);
              return (
                <div className="course-test__item" key={elem.question_id}>
                  <p className="course-test__item--question-num">
                    <span>*</span> Вопрос <span>№{index + 1}</span>{" "}
                    <span
                      style={{
                        color: isCorrect(elem.status) ? "#46FF00" : "#E02424",
                      }}
                    >
                      {elem.status}
                    </span>
                  </p>
                  <p className="course-test__item--question">{elem.text}</p>
                  <div
                    className="course-test__options"
                    style={{
                      border: isCorrect(elem.status)
                        ? "1px  solid #46FF00"
                        : "1px  solid #E02424",
                    }}
                  >
                    <label className="course-test__option">
                      <input
                        type="radio"
                        className="course-test__radio"
                        readOnly
                        disabled
                      />{" "}
                      <span
                        className="course-test__custom-radio"
                        style={{
                          background: isCorrect(elem.status)
                            ? "#46FF00"
                            : "#E02424",
                          borderColor: isCorrect(elem.status)
                            ? "#46FF00"
                            : "#E02424",
                        }}
                      ></span>
                      <span>{elem.user_answer}</span>
                    </label>
                  </div>
                </div>
              );
            })}
      </div>
      <div className="course-test__btns">
        <button className="btn" onClick={onHandleMain}>
          На страницу курсов
        </button>
      </div>
    </div>
  );
};

export default CourseResult;
