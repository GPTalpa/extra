import "./style.scss";

import Image from "next/image";
import { useEffect, useState } from "react";
import getCourseTest from "@utils/getCourseTest";
import { courseTest } from "@mytypes/courseTest";
import postSubmitCourse from "@utils/postSubmitCourse";
import CourseResult from "./CourseResult";

interface ICourse {
  handleBack: () => void;
  openedId: string | null;
  courseId: string | undefined;
  blockId: string | undefined;
}

const CourseTest = ({ handleBack, openedId, courseId, blockId }: ICourse) => {
  const [data, setData] = useState<courseTest[] | null | undefined>(undefined);
  const [isResult, setIsResult] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const dataServ = await getCourseTest(openedId);
      setData(dataServ);
    }

    fetchData();
  }, [openedId]);

  const handleBackResults = () => {
    setIsResult(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Собираем данные из формы
    const formData = new FormData(e.currentTarget);
    const answers: Array<{ question_id: string; selected_answer_id: string }> =
      [];

    for (const [questionId, answerId] of formData.entries()) {
      answers.push({
        question_id: questionId,
        selected_answer_id: answerId as string,
      });
    }

    // Здесь отправка на сервер
    await postSubmitCourse(data?.[0]?.block_id, answers);
    setIsResult(true);
  };
  console.log(data);

  return (
    <>
      {!isResult ? (
        <div className="course-test">
          <button className="course--back" onClick={handleBack}>
            <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
            Назад
          </button>
          <p className="course-test__content--label">
            <span style={{ color: "#FA2828" }}>Часть 2</span> Практика
          </p>
          <form onSubmit={handleSubmit}>
            <div className="course-test__content">
              {!data
                ? "Загрузка..."
                : data.map((elem, index) => {
                    return (
                      <div className="course-test__item" key={elem.id}>
                        <p className="course-test__item--question-num">
                          <span style={{ color: "#FA2828" }}>*</span> Вопрос{" "}
                          <span style={{ color: "#FA2828" }}>№{index + 1}</span>
                        </p>
                        <p className="course-test__item--question">
                          {elem.text}
                        </p>
                        <div className="course-test__options">
                          {elem.options.map((e) => {
                            return (
                              <label className="course-test__option" key={e.id}>
                                <input
                                  type="radio"
                                  name={elem.id}
                                  value={e.id}
                                  className="course-test__radio"
                                  required
                                />{" "}
                                <span className="course-test__custom-radio"></span>
                                <span>{e.text}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
            </div>
            <div className="course-test__btns">
              <button className="btn btn--back" onClick={handleBack}>
                Назад
              </button>
              <button className="btn" type="submit">
                Завершить тест
              </button>
            </div>
          </form>
        </div>
      ) : (
        <CourseResult
          handleBack={handleBackResults}
          blockId={blockId}
          courseId={courseId}
        />
      )}
    </>
  );
};

export default CourseTest;
