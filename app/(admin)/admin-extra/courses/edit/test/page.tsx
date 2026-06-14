"use client";
import "./style.scss";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import getCourseTest from "@utils/getCourseTest";
import { courseTest } from "@mytypes/courseTest";
import EditTestQuestions from "@sections/admin/testQuestions/editTestQuestions";

function CreateCourseLearningContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const blockId = searchParams.get("blockId");
  const [countQuestions, setCountQuestions] = useState(1);
  const [data, setData] = useState<courseTest[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const dataServ = await getCourseTest(blockId);
      setCountQuestions(dataServ ? dataServ.length : 0);
      setData(dataServ);
    }

    fetchData();
  }, [blockId]);

  if (!id) {
    return (
      <div className="course">
        <Link
          className="course--back"
          href={`/admin-extra/courses/edit/learning?id=${id}`}
        >
          <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
          Назад
        </Link>
        <div className="course__content">Что то пошло не так</div>
      </div>
    );
  }

  return (
    <>
      <div className="course">
        <Link
          className="course--back"
          href={`/admin-extra/courses/edit/learning?id=${id}`}
        >
          <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
          Назад
        </Link>
        <div className="course-test">
          <p className="course-test__content--label">
            <span style={{ color: "#FA2828" }}>Часть 2</span> Практика
          </p>
          <div className="course-test__content">
            {data &&
              data.map((question, index) => (
                <EditTestQuestions
                  key={index}
                  num={index + 1}
                  blockId={blockId}
                  data={question}
                />
              ))}
            <button
              type="button"
              className="course-test__add-question"
              onClick={() => setCountQuestions((prev) => prev + 1)}
            >
              <span className="course-test__add-question-icon">+</span>
              Добавить вопрос
            </button>
          </div>
        </div>
      </div>
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
