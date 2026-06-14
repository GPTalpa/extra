"use client";

import CourseResult from "@sections/Course/CourseResult";
import getSubmissions from "@utils/admin/getSubmissions";
import getCourse from "@utils/getCourse";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const CourseClientFormContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    return <>Что то пошло не так</>;
  }

  getCourse(id).then((res) => {
    res?.blocks.forEach((elem) => {
      if (elem.block_type === "mixed_test") {
        getSubmissions(elem.id).then((res) => {
          console.log(res);
        });
      }
    });
  });

  return (
    <>
      <CourseResult courseId={id} />
    </>
  );
};

export default function CourseClientForm() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <CourseClientFormContent />
    </Suspense>
  );
}
