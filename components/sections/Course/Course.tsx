import Link from "next/link";
import "./style.scss";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CourseType } from "@mytypes/course";
import getCourse from "@utils/getCourse";
import CourseTest from "./CourseTest";

interface ICourse {
  handleBack: () => void;
  openedId: string | null;
}

const Course = ({ handleBack, openedId }: ICourse) => {
  const [data, setData] = useState<CourseType | null | undefined>(undefined);
  const [openedTest, setOpenedTest] = useState(false);
  const [openedIdTest, setOpenedIdTest] = useState<string | null>(null);
  useEffect(() => {
    async function fetchData() {
      const dataServ = await getCourse(openedId);
      setData(dataServ);
    }

    fetchData();
  }, [openedId]);

  const handleBackTest = () => {
    setOpenedTest(false);
  };

  const handleOpenDevice = (id: string) => {
    setOpenedIdTest(id);
    setOpenedTest(true);
  };

  return (
    <>
      {!openedTest ? (
        <div className="course">
          <button className="course--back" onClick={handleBack}>
            <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
            Назад
          </button>

          {!data ? (
            "Загрузка..."
          ) : (
            <div className="course__content">
              <div className="course__content__video">
                <Link
                  href={data.blocks[0].video_url}
                  className="course__content__video--video"
                  target="_blank"
                >
                  <button className="course__content__video--btn">
                    Смотреть курс
                  </button>
                </Link>
                <div className="course__content__video__footer">
                  <p>
                    <span style={{ color: "#FA2828" }}>Часть 1</span> Теория
                  </p>
                  <button
                    className="course__content__video--btn-totest"
                    onClick={() => handleOpenDevice(data.blocks[1].id)}
                  >
                    К тесту{" "}
                    <Image
                      src="/icon/arrow-right.svg"
                      width={7.609863234741965}
                      height={11.34972159263134}
                      alt=""
                    />
                  </button>
                </div>
              </div>
              <div className="course__text">
                <div className="course__text__header">
                  <div className="course__text--progress">
                    <span className="completed">1</span>/
                    <span className="total">18</span>
                  </div>
                  <div className="course__text--type">
                    {data.audience_label}
                  </div>
                  <div className="course__text--lvl">
                    Уровень: {data.level_label}
                  </div>
                </div>
                <div className="course__text__content">
                  <h1 className="course__text__content--title">
                    {data.blocks[0].title}
                  </h1>
                  <p className="course__text__content--description">
                    {data.blocks[0].description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <CourseTest
          handleBack={handleBackTest}
          openedId={openedIdTest}
          blockId={data?.blocks[1].id}
          courseId={data?.blocks[0].course_id}
        />
      )}
    </>
  );
};

export default Course;
