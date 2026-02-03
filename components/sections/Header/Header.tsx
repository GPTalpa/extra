"use client";

import "./Header.scss";

import Image from "next/image";
import Link from "next/link";

import ProfileNav from "@ui/ProfileNav";
import Input from "@ui/Input";
import getUser from "@utils/getUser";
import NavMobile from "@ui/NavMobile";
import { use, useEffect, useRef, useState } from "react";
import { User } from "@mytypes/user";
import { usePathname } from "next/navigation";
import { get } from "@lib/api";

const Header = () => {
  const [data, setData] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  console.log(pathname);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      const dataServ = await getUser();
      setData(dataServ);
    }
    if (pathname === "/check") {
      return;
    } else {
      fetchData();
    }
  }, [pathname]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (pathname === "/verify-email") {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      async function fetchData() {
        try {
          const dataServ = await get(`/auth/verify-email/?token=${token}`);
          console.log(dataServ);
        } catch (e) {
          throw e;
        }
      }

      fetchData();
    }
    console.log(pathname);
  }, [pathname]);
  return (
    <header className="site-header" ref={ref}>
      <button
        className="burger"
        aria-label="Открыть меню"
        onClick={() => setOpen(true)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <Link href="/">
        {" "}
        <Image src="/icon/logo.svg" alt="Логотип" width={116} height={72} />
      </Link>
      <nav>
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
      <NavMobile open={open} />
      <Input className="nav--input" placeholder="Глобальный поиск..." />
      <ProfileNav user={data ? data : null} />
    </header>
  );
};

export default Header;
