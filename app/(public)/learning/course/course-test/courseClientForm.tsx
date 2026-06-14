"use client";

import "../style.scss";
import "../../style.scss";
import { useEffect, useState } from "react";
import getCourseTest from "@utils/getCourseTest";
import { courseTest } from "@mytypes/courseTest";
import postSubmitCourse from "@utils/postSubmitCourse";
import CourseResult from "@sections/Course/CourseResult";

interface ICourse {
  id: string;
  blockId: string;
}

const normalizeQuestionType = (value?: string | null) => {
  switch (value) {
    case "single_choice":
    case "single":
      return "single";
    case "multiple_choice":
    case "multiple":
      return "multiple";
    case "free_text":
    case "text":
      return "text";
    default:
      return "single";
  }
};

const CourseClientForm = ({ id, blockId }: ICourse) => {
  const [dataFromTest, setDataFromTest] = useState<
    courseTest[] | null | undefined
  >(undefined);
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

    const formData = new FormData(e.currentTarget);
    const answers: Array<{
      question_id: string;
      selected_answer_id?: string;
      text_answer?: string;
    }> = [];

    for (const question of dataFromTest ?? []) {
      const questionType = normalizeQuestionType(question.question_type);

      if (questionType === "multiple") {
        const selectedAnswers = formData.getAll(question.id);

        selectedAnswers.forEach((answerId) => {
          answers.push({
            question_id: question.id,
            selected_answer_id: String(answerId),
          });
        });

        continue;
      } else if (questionType === "single") {
        const selectedAnswer = formData.get(question.id);

        if (selectedAnswer === null || selectedAnswer === "") {
          continue;
        }

        answers.push({
          question_id: question.id,
          selected_answer_id: String(selectedAnswer),
        });
      } else if (questionType === "text") {
        const selectedAnswer = formData.get(question.id);

        if (selectedAnswer === null || selectedAnswer === "") {
          continue;
        }

        answers.push({
          question_id: question.id,
          text_answer: String(selectedAnswer),
        });
      }
    }

    await postSubmitCourse(blockId, answers);
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
              {dataFromTest === undefined || dataFromTest === null
                ? "Загрузка..."
                : dataFromTest.map((elem, index) => {
                    const questionType = normalizeQuestionType(
                      elem.question_type,
                    );

                    return (
                      <div className="course-test__item" key={elem.id}>
                        <p className="course-test__item--question-num">
                          <span style={{ color: "#FA2828" }}>*</span> Вопрос{" "}
                          <span style={{ color: "#FA2828" }}>№{index + 1}</span>
                        </p>
                        <p className="course-test__item--question">
                          {elem.text}
                        </p>
                        {questionType === "text" ? (
                          <div className="course-test__text-wrap">
                            <input
                              type="text"
                              name={elem.id}
                              className="course-test__text-input"
                              placeholder="Введите ответ"
                              required
                            />
                          </div>
                        ) : (
                          <div className="course-test__options">
                            {elem.options.map((option) => {
                              return (
                                <label
                                  className={`course-test__option ${questionType === "multiple" ? "course-test__option--multiple" : ""}`}
                                  key={option.id}
                                >
                                  <input
                                    type={
                                      questionType === "multiple"
                                        ? "checkbox"
                                        : "radio"
                                    }
                                    name={elem.id}
                                    value={option.id}
                                    className={
                                      questionType === "multiple"
                                        ? "course-test__checkbox"
                                        : "course-test__radio"
                                    }
                                    required={questionType === "single"}
                                  />{" "}
                                  <span
                                    className={
                                      questionType === "multiple"
                                        ? "course-test__custom-checkbox"
                                        : "course-test__custom-radio"
                                    }
                                  ></span>
                                  <span>{option.text}</span>
                                </label>
                              );
                            })}
                          </div>
                        )}
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
