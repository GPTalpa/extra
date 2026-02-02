"use client";

// import { Metadata } from "next";
import "./style.scss";
import ProgressDots from "@ui/ProgressDots";

import getUser from "@utils/getUser";
import Profile from "@sections/Profile";
import { useEffect, useState } from "react";
import { User } from "@mytypes/user";

import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [data, setData] = useState<User | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const dataServ = await getUser();
      setData(dataServ);
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
  const { full_name, email, role, avatarUrl } = data;
  return (
    <main className="profile-page">
      <section>
        <div className="profile-page__header">
          <Profile
            fullName={full_name}
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
          <div className="profile-page__content__course">
            <div className="profile-page__content__course__heading">
              <p className="profile-page__content__course__heading--name">
                Какой-то курс:{" "}
              </p>
              <p className="profile-page__content__course__heading--progress">
                <span className="completed">4</span>/
                <span className="total">25</span>
              </p>
            </div>

            <div className="profile-page__content__course--progress">
              <ProgressDots completed={4} total={25} />
            </div>
            <button className="profile-page__content__course--continue">
              Продолжить
            </button>
          </div>
          <div className="profile-page__content__course">
            <div className="profile-page__content__course__heading">
              <p className="profile-page__content__course__heading--name">
                Еще один курс:{" "}
              </p>
              <p className="profile-page__content__course__heading--progress">
                <span className="completed">2</span>/
                <span className="total">16</span>
              </p>
            </div>

            <div className="profile-page__content__course--progress">
              <ProgressDots completed={2} total={16} />
            </div>
            <button className="profile-page__content__course--continue">
              Продолжить
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
