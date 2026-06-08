"use client";
import "./style.scss";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "store";
import createCourse from "@utils/admin/createCourse";

export default function CreateCourse() {
  const [typeLearning, settypeLearning] = useState("");
  const [level, setLevel] = useState("");
  const [withErrors, setWithErrors] = useState(false);
  const [errors, setError] = useState<string[]>([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const { loading, setLoading } = useAuthStore();

  const validateForm = () => {
    let hasErrors = false;
    setError([]);
    if (!typeLearning) {
      setError((prev) => [...prev, "Необходимо указать тип обучения"]);
      setWithErrors(true);
      hasErrors = true;
    }

    if (!level) {
      setError((prev) => [...prev, "Необходимо указать уровень сложности"]);
      setWithErrors(true);
      hasErrors = true;
    }

    if (!courseTitle) {
      setError((prev) => [...prev, "Необходимо указать название курса"]);
      setWithErrors(true);
      hasErrors = true;
    }

    if (!courseDescription) {
      setError((prev) => [...prev, "Необходимо указать описание курса"]);
      setWithErrors(true);
      hasErrors = true;
    }

    setWithErrors(hasErrors);
    return !hasErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    if (!validateForm()) {
      setWithErrors(true);
      setLoading(false);
      return;
    }
    const title = courseTitle;
    const description = courseDescription;
    const audience = typeLearning;

    try {
      createCourse({ title, description, level, audience }).then((res) => {
        setLoading(false);
        setWithErrors(false);
        console.log(res?.id);
        window.location.href = `/admin-extra/courses/create/learning?id=${res?.id}`;
      });
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof Error) {
        setWithErrors(true);
      } else {
        console.log("Неизвестная ошибка");
      }
    }
  };

  return (
    <main className="course-create">
      <Link className="course--back" href="/learning/">
        <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
        Назад
      </Link>
      <form className="course-create__content" onSubmit={handleSubmit}>
        <div className="course-create__left">
          <label htmlFor="title" className="course-create--title">
            <p>Название курса</p>
            <input
              type="text"
              id="title"
              placeholder="Введите название..."
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
            />
          </label>
          <label htmlFor="descripion" className="course-create--descripion">
            <p>Описание курса</p>
            <input
              type="text"
              id="descripion"
              placeholder="Введите описание..."
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
            />
          </label>
          <button className="learning__item--btn">
            {loading ? (
              <Image
                src="/icon/loading.gif"
                alt="Загрузка"
                width={20}
                height={20}
              />
            ) : withErrors ? (
              "Поля не заполнены"
            ) : (
              "Следующий шаг"
            )}
          </button>
        </div>
        <div className="course-create__right">
          <p className="course-create__right--title">Выберите тэги</p>
          <div className="course-create__right__content">
            <div className="course-create__right__content__column">
              <div
                className={`btn course-create__header__filter__item ${typeLearning === "everyone" ? "active" : ""}`}
                onClick={() => settypeLearning("everyone")}
              >
                {typeLearning === "everyone" ? <span></span> : ""}
                Для всех
              </div>
              <div
                className={`btn course-create__header__filter__item ${typeLearning === "installer" ? "active" : ""}`}
                onClick={() => settypeLearning("installer")}
              >
                {typeLearning === "installer" ? <span></span> : ""}
                Для Монтажников
              </div>
              <div
                className={`btn course-create__header__filter__item ${typeLearning === "seller" ? "active" : ""}`}
                onClick={() => settypeLearning("seller")}
              >
                {typeLearning === "seller" ? <span></span> : ""}
                Для Продавцов
              </div>
              <div
                className={`btn course-create__header__filter__item ${typeLearning === "serviceman" ? "active" : ""}`}
                onClick={() => settypeLearning("serviceman")}
              >
                {typeLearning === "serviceman" ? <span></span> : ""}
                Для Сервесников
              </div>
            </div>
            <div className="course-create__right__content__column">
              <div
                className={`btn course-create__header__filter__item ${level === "beginner" ? "active" : ""}`}
                onClick={() => setLevel("beginner")}
              >
                {level === "beginner" ? <span></span> : ""}
                Для начинающих
              </div>
              <div
                className={`btn course-create__header__filter__item ${level === "intermediate" ? "active" : ""}`}
                onClick={() => setLevel("intermediate")}
              >
                {level === "intermediate" ? <span></span> : ""}
                Для среднего уровня
              </div>
              <div
                className={`btn course-create__header__filter__item ${level === "advanced" ? "active" : ""}`}
                onClick={() => setLevel("advanced")}
              >
                {level === "advanced" ? <span></span> : ""}
                Для продвинутых
              </div>
            </div>
          </div>
          {!withErrors ? (
            ""
          ) : (
            <div className="course-create__errors">
              {errors.map((elem, i) => {
                return <p key={i}>{elem}</p>;
              })}
            </div>
          )}
        </div>
      </form>
    </main>
  );
}
