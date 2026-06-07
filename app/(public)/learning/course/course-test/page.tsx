// learning/[id]/course-test/[blockId]/page.tsx
"use client";

import "../style.scss";
import "../../style.scss";
import Image from "next/image";
import Link from "next/link";
import CourseClientForm from "./courseClientForm";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function MalfunctionContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const blockId = searchParams.get("blockId");

  if (!id || !blockId) {
    return <div>Что то пошло не такююю</div>;
  }

  return (
    <div className="course-test">
      <Link href={`/learning/${id}`} className="course--back">
        <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
        Назад
      </Link>
      <CourseClientForm id={id} blockId={blockId} />
    </div>
  );
}

const CourseTest = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <MalfunctionContent />
    </Suspense>
  );
};

export default CourseTest;
