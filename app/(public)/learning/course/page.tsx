"use client";

import "../style.scss";
import "./style.scss";

import Image from "next/image";
import Link from "next/link";
import { CourseType } from "@mytypes/course";
import getCourse from "@utils/getCourse";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function MalfunctionContent() {
  const [data, setData] = useState<CourseType | null | undefined>(undefined);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;
    async function fetchData() {
      const dataServ = await getCourse(id);
      setData(dataServ);
    }
    fetchData();
  }, [id]);

  const videoUrl = data?.blocks?.[0]?.video_url;
  const blockId = data?.blocks[1]?.id;

  if (!data) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="course">
      <Link className="course--back" href="/learning/">
        <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
        Назад
      </Link>

      {!data ? (
        "Загрузка..."
      ) : (
        <div className="course__content">
          <div className="course__content__video">
            {videoUrl ? (
              <Link
                href={videoUrl}
                className="course__content__video--video"
                target="_blank"
              >
                <button className="course__content__video--btn">
                  Смотреть курс
                </button>
              </Link>
            ) : (
              <button className="course__content__video--btn" disabled>
                Видео недоступно
              </button>
            )}
            <div className="course__content__video__footer">
              <p>
                <span style={{ color: "#FA2828" }}>Часть 1</span> Теория
              </p>
              {blockId ? (
                <Link
                  className="course__content__video--btn-totest"
                  href={`/learning/course/course-test?id=${id}&blockId=${blockId}`}
                >
                  К тесту{" "}
                  <Image
                    src="/icon/arrow-right.svg"
                    width={7.609863234741965}
                    height={11.34972159263134}
                    alt=""
                  />
                </Link>
              ) : (
                <button className="course__content__video--btn-totest" disabled>
                  Тест недоступен
                </button>
              )}
            </div>
          </div>
          <div className="course__text">
            <div className="course__text__header">
              <div className="course__text--progress">
                <span className="completed">{data?.progress?.completed}</span>/
                <span className="total">{data?.progress?.total}</span>
              </div>
              <div className="course__text--type">{data?.audience_label}</div>
              <div className="course__text--lvl">
                Уровень: {data?.level_label}
              </div>
            </div>
            <div className="course__text__content">
              <h1 className="course__text__content--title">
                {data?.blocks[0]?.title}
              </h1>
              <p className="course__text__content--description">
                {data?.blocks[0]?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Course = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <MalfunctionContent />
    </Suspense>
  );
};

export default Course;
