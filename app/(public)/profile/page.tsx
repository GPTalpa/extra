// import { Metadata } from "next";
import "./style.scss";
import Image from "next/image";

import Input from "@ui/Input";
import { redirect } from "next/navigation";
import ProgressDots from "@ui/ProgressDots";

import getUser from "@utils/getUser";

export default async function ProfilePage() {
  const data = await getUser();
  if (!data?.user) {
    redirect("/auth");
  }
  const { fullName, email, role, avatarUrl } = data.user;

  return (
    <main className="profile-page">
      <section>
        <div className="profile-page__header">
          <div className="profile-page__header__left-side">
            <div className="profile-page__header__left-side__info">
              <div className="profile-page__header__left-side__info__heading">
                <div className="profile-page__header__left-side__info__heading--profile-image">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      width={76}
                      height={76}
                      alt="Фотография профиля"
                    />
                  ) : (
                    <Image
                      src="/icon/profile.svg"
                      width={76}
                      height={76}
                      alt="Фотография профиля"
                    />
                  )}
                </div>
                <div className="profile-page__header__left-side__info__heading__name-role">
                  <p className="profile-page__header__left-side__info__heading__name-role--name">
                    {fullName}
                  </p>
                  <p className="profile-page__header__left-side__info__heading__name-role--role">
                    Роль: <span>{role}</span>
                  </p>
                </div>
              </div>
              <address className="profile-page__header__left-side__info__contacts">
                <div className="profile-page__header__left-side__info__contacts__tel">
                  <Image
                    src="/icon/telephone.svg"
                    width={37}
                    height={35}
                    alt="Иконка телефона"
                  />
                  <div className="profile-page__header__left-side__info__contacts__tel--phone">
                    <p>Телефон:</p>
                    <span>+7 (123) 456 78 90</span>
                  </div>
                </div>
                <div className="profile-page__header__left-side__info__contacts__mail">
                  <Image
                    src="/icon/mail.svg"
                    width={37}
                    height={28}
                    alt="Иконка почты"
                  />
                  <div className="profile-page__header__left-side__info__contacts__mail--email">
                    <p>Почта:</p>
                    <span>{email}</span>
                  </div>
                </div>
              </address>
            </div>
            <button className="profile-page__header__left-side__info--edit">
              <Image
                src="/icon/pensil.svg"
                width={29}
                height={29}
                alt="Иконка карандаша"
              />
            </button>
          </div>
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
