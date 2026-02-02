"use client";
import "./style.scss";

import Image from "next/image";
import Link from "next/link";

import Input from "@ui/Input";
import getUser from "@utils/getUser";
import { useState } from "react";
import { ROLES } from "@lib/constants";

interface IProfile {
  fullName: string;
  email: string;
  role: string;
  avatarUrl: string | null;
}

const Profile = ({ fullName, email, role, avatarUrl }: IProfile) => {
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [roleHandle, setRoleHandle] = useState(role);
  const [emailHandle, setEmailHandle] = useState(email);

  const handleClickPensil = () => {
    setIsEdit(!isEdit);
  };

  const handleClickSelect = (role: string) => {
    setRoleHandle(role);
    setOpen(false);
  };

  const handleInputEmail = (email: string) => {
    setEmailHandle(email);
  };

  return (
    <>
      {" "}
      <div
        className="profile-page__header__left-side"
        style={
          isEdit
            ? {
                zIndex: "11",
              }
            : {}
        }
      >
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
            </div>
          </div>
          <address className="profile-page__header__left-side__info__contacts">
            <div className="profile-page__header__left-side__info__contacts__tel">
              <Image
                src="/icon/role.svg"
                width={37}
                height={35}
                alt="Иконка роли"
              />
              <div className="profile-page__header__left-side__info__contacts__tel--phone">
                <p>Роль:</p>
                {isEdit ? (
                  <div className="custom-select">
                    <button onClick={() => setOpen(!open)}>
                      {roleHandle || role}
                    </button>

                    {open && (
                      <ul className="custom-options">
                        {ROLES.map((r) => (
                          <li
                            key={r.key}
                            onClick={() => handleClickSelect(r.key)}
                            className="custom-options--item"
                          >
                            {r.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <span>{roleHandle}</span>
                )}
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
                {isEdit ? (
                  <input
                    type="email"
                    value={emailHandle}
                    className="profile-page__header__left-side__info__contacts--edit-field"
                    onChange={(e) => handleInputEmail(e.target.value)}
                  />
                ) : (
                  <span>{emailHandle}</span>
                )}
              </div>
            </div>
          </address>
        </div>
        <button
          className="profile-page__header__left-side__info--edit"
          onClick={() => handleClickPensil()}
        >
          <Image
            src={isEdit ? "/icon/cross.svg" : "/icon/pensil.svg"}
            width={29}
            height={29}
            alt="Иконка карандаша"
          />
        </button>
      </div>{" "}
      {isEdit ? <div className="overlay"></div> : ""}
    </>
  );
};

export default Profile;
