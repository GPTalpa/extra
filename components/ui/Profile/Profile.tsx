"use client";

import "./style.scss";

import Image from "next/image";
import Link from "next/link";
import { useUIStore } from "store";

const Profile = () => {
  const { profileOpen, toggleProfile } = useUIStore();

  return (
    <div className={`profile ${profileOpen ? "is-open" : ""}`}>
      <div className="profile__trigger" onClick={toggleProfile}>
        <div className="profile__image">
          <Image src="/icon/profile.svg" alt="" width={23} height={27} />
        </div>
        <Image src="/icon/arrow-bottom.svg" alt="" width={17} height={8} />
      </div>

      <div className="profile__panel">
        <div className="profile__panel--trigger">
          <div className="profile__trigger" onClick={toggleProfile}>
            <div className="profile__image">
              <Image src="/icon/profile.svg" alt="" width={23} height={27} />
            </div>
            <Image src="/icon/arrow-bottom.svg" alt="" width={17} height={8} />
          </div>
        </div>
        <div className="profile__panel--btns">
          <Link href="/auth" style={{ width: "100%" }}>
            <button className="btn btn--gray">Войти</button>
          </Link>

          {/* <button className="btn btn--active">Выйти</button> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
