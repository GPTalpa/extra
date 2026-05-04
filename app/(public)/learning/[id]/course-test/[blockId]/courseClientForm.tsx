"use client";

import "../../style.scss";
import "../../../style.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import getCourseTest from "@utils/getCourseTest";
import { courseTest } from "@mytypes/courseTest";
import postSubmitCourse from "@utils/postSubmitCourse";
import CourseResult from "@sections/Course/CourseResult";

interface ICourse {
  id: string;
  blockId: string;
}

const CourseClientForm = ({ id, blockId }: ICourse) => {
  const [dataFromTest, setDataFromTest] = useState<
    courseTest[] | null | undefined
  >([]);
  const [isResult, setIsResult] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const dataServ = await getCourseTest(blockId);
      setDataFromTest(dataServ);
    }

    fetchData();
  }, [blockId]);

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
    await postSubmitCourse(dataFromTest?.[0]?.block_id, answers);
    setIsResult(true);
  };
  return (
    <>
      {!isResult ? (
        <>
          {" "}
          <p className="course-test__content--label">
            <span style={{ color: "#FA2828" }}>Часть 2</span> Практика
          </p>
          <form onSubmit={handleSubmit}>
            <div className="course-test__content">
              {!dataFromTest
                ? "Загрузка..."
                : dataFromTest.map((elem, index) => {
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
              <button className="btn btn--back">Назад</button>
              <button className="btn" type="submit">
                Завершить тест
              </button>
            </div>
          </form>
        </>
      ) : (
        <CourseResult courseId={id} blockId={blockId} />
      )}
    </>
  );
};

export default CourseClientForm;
