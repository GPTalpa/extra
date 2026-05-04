// learning/[id]/course-test/[blockId]/page.tsx

import "../../style.scss";
import "../../../style.scss";
import Image from "next/image";
import getCourses from "@utils/getCourses";
import getCourse from "@utils/getCourse";
import Link from "next/link";
import CourseClientForm from "./courseClientForm";

interface PageProps {
  params: Promise<{
    id: string;
    blockId: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const courses = await getCourses();

    if (!courses || !Array.isArray(courses)) {
      return [];
    }

    // Генерируем параметры для всех блоков всех курсов
    const params = [];

    for (const course of courses) {
      // Получаем все блоки курса
      const courseData = await getCourse(String(course.id));

      if (courseData?.blocks && Array.isArray(courseData.blocks)) {
        for (const block of courseData.blocks) {
          // Здесь нужно определить, какие блоки являются тестами
          if (
            block.block_type === "auto_test" ||
            block.id === courseData.blocks[1]?.id
          ) {
            // Возвращаем ТОЛЬКО параметры маршрута
            params.push({
              id: String(course.id),
              blockId: String(block.id),
            });
          }
        }
      }
    }

    return params;
  } catch (error) {
    console.error("Error generating static params for test:", error);
    return [];
  }
}
const CourseTest = async ({ params }: PageProps) => {
  const { id, blockId } = await params;

  return (
    <div className="course-test">
      <Link href={`/learning/${id}`} className="course--back">
        <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
        Назад
      </Link>
      <CourseClientForm id={id} blockId={blockId} />
    </div>
  );
};

export default CourseTest;
