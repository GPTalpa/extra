import Link from "next/link";
import "./style.scss";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CourseType } from "@mytypes/course";
import getCourseSearch from "@utils/getCourseSearch";
import getCourse from "@utils/getCourse";

interface ICourse {
  handleBack: () => void;
  openedId: string | null;
}

const Course = ({ handleBack, openedId }: ICourse) => {
  const [data, setData] = useState<CourseType | null | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      const dataServ = await getCourse(openedId);
      setData(dataServ);
    }

    fetchData();
  }, [openedId]);

  const getLvl = (level: string) => {
    switch (level) {
      case "beginner":
        return "Новичок";
        break;

      default:
        break;
    }
  };

  return (
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
            <Link href="#" className="course__content__video--video">
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
                // onClick={() => setIsOpenCurse(true)}
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
              <div className="course__text--type">Монтажник</div>
              <div className="course__text--lvl">Уровень: Новичок</div>
            </div>
            <div className="course__text__content">
              <h1 className="course__text__content--title">Здесь заголовок</h1>
              <p className="course__text__content--description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quibusdam libero cumque qui magnam hic natus illum at nesciunt
                impedit nobis. Illum eveniet culpa doloremque totam debitis
                perferendis fugiat ab consequuntur. Adipisci itaque
                exercitationem saepe commodi fugit, possimus praesentium nulla
                inventore labore aut earum atque delectus esse sed dolorem error
                doloribus? Commodi at cumque natus vero illum voluptatum soluta
                incidunt veritatis. Libero voluptatum dolor minima nihil amet
                magni, modi aspernatur, maiores sint officiis ea dignissimos!
                Alias eum, ipsam voluptatibus quia aut ea quod nisi pariatur
                eaque voluptatum libero nesciunt aspernatur molestias?
              </p>
            </div>
          </div>
        </div>
      )}
      {/* <div className="course__content">
        <div className="course__content__video">
          <Link href="#" className="course__content__video--video">
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
              // onClick={() => setIsOpenCurse(true)}
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
            <div className="course__text--type">Монтажник</div>
            <div className="course__text--lvl">Уровень: Новичок</div>
          </div>
          <div className="course__text__content">
            <h1 className="course__text__content--title">Здесь заголовок</h1>
            <p className="course__text__content--description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              libero cumque qui magnam hic natus illum at nesciunt impedit
              nobis. Illum eveniet culpa doloremque totam debitis perferendis
              fugiat ab consequuntur. Adipisci itaque exercitationem saepe
              commodi fugit, possimus praesentium nulla inventore labore aut
              earum atque delectus esse sed dolorem error doloribus? Commodi at
              cumque natus vero illum voluptatum soluta incidunt veritatis.
              Libero voluptatum dolor minima nihil amet magni, modi aspernatur,
              maiores sint officiis ea dignissimos! Alias eum, ipsam
              voluptatibus quia aut ea quod nisi pariatur eaque voluptatum
              libero nesciunt aspernatur molestias?
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Course;
