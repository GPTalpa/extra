"use client";

import "./style.scss";
import Input from "@ui/Input";
import Link from "next/link";

const NavMobile = ({ open }: { open: boolean }) => {
  return (
    <nav className={open ? "nav-mobile open" : "nav-mobile"}>
      {" "}
      <Input
        isMobile={true}
        className="nav-mobile--input"
        placeholder="Глобальный поиск..."
      />
      <ul>
        <li>
          <Link href="/selecting_device">Подбор прибора</Link>
        </li>
        <li>
          <Link href={"/help"}>Справка</Link>
        </li>
        <li>
          <Link href={"#"}>Обучение</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMobile;
