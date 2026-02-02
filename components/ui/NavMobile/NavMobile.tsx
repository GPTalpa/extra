"use client";

import "./style.scss";

import Image from "next/image";
import { useUIStore } from "store";
import type { User } from "@mytypes/user";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { post } from "@lib/api";
import Input from "@ui/Input";
import Link from "next/link";

const NavMobile = ({ open }: { open: boolean }) => {
  console.log(open);
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
          <Link href={"#"}>Справка</Link>
        </li>
        <li>
          <Link href={"#"}>Обучение</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMobile;
