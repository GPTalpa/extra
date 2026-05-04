import "./style.scss";

import Image from "next/image";
import { useEffect, useState } from "react";
import getCourseTest from "@utils/getCourseTest";
import { courseTest } from "@mytypes/courseTest";
import postSubmitCourse from "@utils/postSubmitCourse";

interface ICourse {
  handleBack: () => void;
  openedId: string | null;
}

const editCreateCourse = ({ handleBack }: ICourse) => {
  const [data, setData] = useState<courseTest[] | null | undefined>(undefined);
  const [isResult, setIsResult] = useState<boolean>(false);

  //   useEffect(() => {
  //     async function fetchData() {
  //       const dataServ = await getCourseTest(openedId);
  //       setData(dataServ);
  //     }

  //     fetchData();
  //   }, [openedId]);

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
  return (
    <div className="course-test">
      <button className="course--back" onClick={handleBack}>
        <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
        Назад
      </button>
      <p className="course-test__content--label">
        <span style={{ color: "#FA2828" }}>Часть 2</span> Практика
      </p>
      <form onSubmit={handleSubmit}>
        <div className="course-test__content__side">
          <label htmlFor="title">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Введите название..."
            />
          </label>
          <label htmlFor="description">
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Введите описание..."
            />
          </label>
          <button type="submit">Следующий шаг</button>
        </div>
        <div className="course-test__content__side">
            <p>Выберите тэги</p>
        </div>
      </form>
    </div>
  );
};

export default editCreateCourse;
