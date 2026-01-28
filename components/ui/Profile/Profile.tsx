"use client";

import "./style.scss";

import Image from "next/image";
import { useUIStore } from "store";
import type { User } from "@mytypes/user";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import { post } from "@lib/api";

interface IProfileProps {
  user: User;
}

const Profile = ({ user }: IProfileProps) => {
  const { profileOpen, setProfile } = useUIStore();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const router = useRouter();

  const onBtnClick = async (action: "profile" | "logout" | "login") => {
    switch (action) {
      case "profile":
        router.push("/profile");
        break;
      case "logout":
        await post("/auth/logout", {});
        window.location.href = "/";
        break;
      case "login":
        router.push("/auth");
        break;
    }
  };

  return (
    <div className={`profile ${profileOpen ? "is-open" : ""}`} ref={ref}>
      <div className="profile__trigger" onClick={() => setProfile(true)}>
        <div className="profile__image">
          <Image src="/icon/profile.svg" alt="" width={23} height={27} />
        </div>
        <Image src="/icon/arrow-bottom.svg" alt="" width={17} height={8} />
      </div>

      <div className="profile__panel">
        <div className="profile__panel--trigger">
          <div className="profile__trigger" onClick={() => setProfile(false)}>
            <div className="profile__image">
              <Image src="/icon/profile.svg" alt="" width={23} height={27} />
            </div>
            <Image src="/icon/arrow-bottom.svg" alt="" width={17} height={8} />
          </div>
        </div>
        {user ? (
          <div className="profile__panel--btns">
            <button
              className="btn btn--gray"
              onClick={() => onBtnClick("profile")}
            >
              Профиль
            </button>
            <button
              className="btn btn--active"
              onClick={() => onBtnClick("logout")}
            >
              Выйти
            </button>
          </div>
        ) : (
          <div className="profile__panel--btns">
            <button
              className="btn btn--gray"
              onClick={() => onBtnClick("login")}
            >
              Войти
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
