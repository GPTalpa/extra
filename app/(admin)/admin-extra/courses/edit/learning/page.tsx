"use client";
import "./style.scss";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "store";
import { useSearchParams } from "next/navigation";
import getCourse from "@utils/getCourse";
import editCourseBlock from "@utils/admin/editCourseBlock";

function CreateCourseLearningContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [isEdit, setIsEdit] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [withErrors, setWithErrors] = useState(false);
  const [errors, setError] = useState<string[]>([]);
  const [learning_block_id, setLearning_block_id] = useState("");
  const [test_block_id, setTest_block_id] = useState("");

  const { loading, setLoading } = useAuthStore();

  useEffect(() => {
    if (!id) return;
    async function fetchData() {
      const dataServ = await getCourse(id);
      dataServ?.blocks.forEach((elem) => {
        if (elem.block_type === "lesson") {
          setCourseTitle(elem.title);
          setCourseDescription(elem.text_content);
          setVideoUrl(elem.video_url);
          setLearning_block_id(elem.id);
        }

        if (elem.block_type === "mixed_test") {
          setTest_block_id(elem.id);
        }
      });
      console.log(dataServ);
    }
    fetchData();
  }, [id]);

  if (!id) {
    return (
      <div className="course">
        <Link
          className="course--back"
          href={`/admin-extra/courses/edit?id=${id}`}
        >
          <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
          Назад
        </Link>
        <div className="course__content">Что то пошло не так</div>
      </div>
    );
  }

  const validateForm = () => {
    let hasErrors = false;
    setError([]);
    if (!videoUrl) {
      setError((prev) => [...prev, "Необходимо загрузить видео"]);
      setWithErrors(true);
      hasErrors = true;
    }

    if (!courseTitle) {
      setError((prev) => [...prev, "Необходимо указать заголовок курса"]);
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

  const handleClickVideo = () => {
    setIsEdit(!isEdit);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isEdit) {
      setIsEdit(!isEdit);
    }

    if (e.key === "Escape" && isEdit) {
      setVideoUrl("");
      setIsEdit(!isEdit);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    if (!validateForm()) {
      setWithErrors(true);
      setLoading(false);
      return;
    }
    const title = courseTitle;
    const text_content = courseDescription;
    const video_url = videoUrl;
    const block_type = "lesson";

    try {
      editCourseBlock(id, learning_block_id, {
        title,
        text_content,
        video_url,
        block_type,
      }).then(() => {
        window.location.href = `/admin-extra/courses/edit/test?id=${id}&blockId=${test_block_id}`;
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
    <>
      <div className="course">
        <Link
          className="course--back"
          href={`/admin-extra/courses/edit?id=${id}`}
        >
          <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
          Назад
        </Link>
        <div className="course__content">
          <div className="course__content__video">
            <div className="course__content__video--video">
              {isEdit ? (
                <input
                  type="email"
                  value={videoUrl}
                  className={
                    "profile-page__header__left-side__info__contacts--edit-field"
                  }
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Введите ссылку на видео"
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                    handleKeyDown(e)
                  }
                />
              ) : (
                <button
                  className="course__content__video--btn"
                  onClick={() => handleClickVideo()}
                >
                  {!!videoUrl ? videoUrl : "Добавить видео"}
                </button>
              )}
            </div>

            <div className="course__content__video__footer">
              <p>
                <span style={{ color: "#FA2828" }}>Часть 1</span> Теория
              </p>

              <button
                className="course__content__video--btn-totest"
                onClick={(e) => handleSubmit(e)}
              >
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
                  <>
                    Следующий шаг
                    <Image
                      src="/icon/arrow-right.svg"
                      width={7.609863234741965}
                      height={11.34972159263134}
                      alt=""
                    />
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="course__text">
            <div className="course__text__content">
              <input
                className="course__text__content--title"
                placeholder="Введите заголовок"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
              />
              <textarea
                className="course__text__content--description"
                placeholder="Введите основной текст"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
              />
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
        </div>
      </div>
      {isEdit ? <div className="overlay"></div> : ""}
    </>
  );
}

export default function CreateCourseLearning() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <CreateCourseLearningContent />
    </Suspense>
  );
}
