import "../style.scss";
import "./style.scss";

import Image from "next/image";
import Link from "next/link";
import { CourseType } from "@mytypes/course";
import getCourse from "@utils/getCourse";
import { notFound } from "next/navigation";
import getCourses from "@utils/getCourses";

interface CourseDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const courses = await getCourses();

    if (!courses || !Array.isArray(courses)) {
      return [];
    }

    return courses.map((item: CourseType) => ({
      id: String(item.id),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

const Course = async ({ params }: CourseDetailProps) => {
  const { id } = await params;

  const data = await getCourse(id);
  const blockId = data?.blocks[1]?.id;

  if (!data) {
    notFound();
  }

  return (
    <>
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
                <Link
                  className="course__content__video--btn-totest"
                  href={`/learning/${id}/course-test/${blockId}`}
                >
                  К тесту{" "}
                  <Image
                    src="/icon/arrow-right.svg"
                    width={7.609863234741965}
                    height={11.34972159263134}
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div className="course__text">
              <div className="course__text__header">
                <div className="course__text--progress">
                  <span className="completed">{data.progress?.completed}</span>/
                  <span className="total">{data.progress?.total}</span>
                </div>
                <div className="course__text--type">{data.audience_label}</div>
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
    </>
  );
};

export default Course;
