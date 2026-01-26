"use client";

import "./Profile.scss";

import Image from "next/image";
import { useUIStore } from "store";

const Profile = () => {
  const { profileOpen, toggleProfile } = useUIStore();

  return (
    <div className={`profile ${profileOpen ? "is-open" : ""}`}>
      <div className="profile__trigger" onClick={toggleProfile}>
        <Image src="/icon/profile.svg" alt="" width={41} height={41} />
        <Image src="/icon/arrow-bottom.svg" alt="" width={17} height={8} />
      </div>

      <div className="profile__panel">
        <div className="profile__panel--trigger">
          <div className="profile__trigger" onClick={toggleProfile}>
            <Image src="/icon/profile.svg" alt="" width={41} height={41} />
            <Image src="/icon/arrow-bottom.svg" alt="" width={17} height={8} />
          </div>
        </div>
        <div className="profile__panel--btns">
          <button className="btn btn--gray">Профиль</button>
          <button className="btn btn--active">Выйти</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
