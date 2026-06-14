"use client";
import { useEffect, useRef, useState } from "react";
import "./style.scss";
import Input from "@ui/Input";
import Course from "@sections/Course";
import { useDebounce } from "@hooks/useDebounce";
import { CourseType } from "@mytypes/course";
import getCourses from "@utils/getCourses";
import getCourseSearch from "@utils/getCourseSearch";
import postStartCourse from "@utils/postStartCourse";
import Link from "next/link";
import onDeleteCourse from "@utils/admin/onDeleteCourse";

export default function Learning() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<CourseType[] | null | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeLearning, settypeLearning] = useState("everyone");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    async function fetchData() {
      if (!debouncedSearchTerm) {
        const dataServ = await getCourses(typeLearning);
        setData(dataServ);
      }

      if (debouncedSearchTerm) {
        const dataServ = await getCourseSearch(debouncedSearchTerm);
        setData(dataServ);
      }
    }

    fetchData();
  }, [debouncedSearchTerm, typeLearning]);

  const handleDeleteCourse = async (id: string) => {
    try {
      await onDeleteCourse(id);
      window.location.reload();
    } catch (err: unknown) {
      if (err instanceof Error) {
      } else {
        console.log("Неизвестная ошибка");
      }
    }
  };

  return (
    <main>
      <section className="learning">
        <div className="learning__content">
          {!data
            ? "Загрузка..."
            : data.map((elem) => {
                console.log(elem);
                return (
                  <div className="learning__item" key={elem.id}>
                    <p className="learning__item--title">
                      {elem.title}: уровень {elem.level_label}
                    </p>
                    <p className="learning__item--description">
                      {elem.description}
                    </p>
                    <div className="learning__item__btns">
                      <a
                        className="learning__item--btn"
                        href={`/admin-extra/check/id?id=${elem.id}`}
                      >
                        Проверить ответы вручную
                      </a>
                    </div>
                  </div>
                );
              })}
        </div>
      </section>
    </main>
  );
}
