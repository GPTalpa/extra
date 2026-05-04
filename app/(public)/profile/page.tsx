"use client";

// import { Metadata } from "next";
import "./style.scss";
import ProgressDots from "@ui/ProgressDots";

import getUser from "@utils/getUser";
import Profile from "@sections/Profile";
import { useEffect, useState } from "react";
import { User } from "@mytypes/user";
import { CoursesProgressResponse } from "@mytypes/courseProgress";

import { useRouter } from "next/navigation";
import getProfileCourses from "@utils/getProfileCourses";
import Course from "@sections/Course";

export default function ProfilePage() {
  const [data, setData] = useState<User | null | undefined>(undefined);
  const [dataCourse, setDataCourse] = useState<
    CoursesProgressResponse | null | undefined
  >(undefined);
  const router = useRouter();
  const [isOpenCourse, setIsOpenCourse] = useState<boolean>(false);
  const [openedCourseId, setOpenedCourseId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const dataServ = await getUser();
      setData(dataServ);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const dataServ = await getProfileCourses();
      setDataCourse(dataServ);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (data === null) {
      router.replace("/auth");
    }
  }, [data, router]);

  if (!data) {
    return null;
  }
  const { fullname, email, role, avatarUrl } = data;

  const handleBackCourses = () => {
    window.location.href = "/learning/";
  };

  const handleClickContinue = (id: string) => {
    setIsOpenCourse(true);
    setOpenedCourseId(id);
  };

  console.log(dataCourse);

  return (
    <>
      {!isOpenCourse ? (
        <main className="profile-page">
          <section>
            <div className="profile-page__header">
              <Profile
                fullName={fullname}
                email={email}
                role={role}
                avatarUrl={avatarUrl}
              />
              <div className="profile-page__header__right-side">
                <div className="profile-page__header__right-side__notify">
                  <div className="profile-page__header__right-side__notify--counter">
                    3
                  </div>
                  <p>Новыe уведомления</p>
                </div>
                <div className="profile-page__header__right-side__change-pass">
                  <p>Изменить пароль</p>
                </div>
              </div>
            </div>
            <div className="profile-page__content">
              <h2>Мои курсы</h2>
              <div className="profile-page__content__container">
                {!dataCourse
                  ? "Загрузка..."
                  : dataCourse.map((elem) => {
                      return (
                        <div
                          className="profile-page__content__course"
                          key={elem.course_id}
                        >
                          <div className="profile-page__content__course__heading">
                            <p className="profile-page__content__course__heading--name">
                              {elem.title}
                            </p>
                            <p className="profile-page__content__course__heading--progress">
                              <span className="completed">
                                {elem.completed}
                              </span>
                              /<span className="total">{elem.all_total}</span>
                            </p>
                          </div>

                          <div className="profile-page__content__course--progress">
                            <ProgressDots
                              completed={elem.completed}
                              total={elem.all_total}
                            />
                          </div>
                          <button
                            className="profile-page__content__course--continue"
                            onClick={() => handleClickContinue(elem.course_id)}
                          >
                            Продолжить
                          </button>
                        </div>
                      );
                    })}
              </div>
            </div>
          </section>
        </main>
      ) : (
        <Course handleBack={handleBackCourses} openedId={openedCourseId} />
      )}
    </>
  );
}
