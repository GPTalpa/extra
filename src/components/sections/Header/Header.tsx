"use client";

import "./Header.scss";

import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="site-header">
      <Image src="/icon/logo.svg" alt="Логотип" width={116} height={72} />
      <nav>
        <ul>
          <li>
            <Link href={"#"}>Подбор прибора</Link>
          </li>
          <li>
            <Link href={"#"}>Справка</Link>
          </li>
          <li>
            <Link href={"#"}>Обучение</Link>
          </li>
        </ul>
      </nav>
      <div className="search__bar">
        <i
          style={{
            position: "absolute",
            top: "50%",
            left: "30px",
            transform: "translateY(-50%)",
          }}
        >
          <Image src="/icon/search.svg" alt="" width={21} height={21} />
        </i>
        <input type="text" placeholder="Глобальный поиск..." />
      </div>
      <div className="profile">
        <Image src="/icon/profile.svg" alt="" width={41} height={41} />
        <Image src="/icon/arrow-bottom.svg" alt="" width={17} height={8} />
      </div>
    </header>
  );
};

export default Header;
