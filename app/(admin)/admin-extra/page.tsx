"use client";

import "./style.scss";
import Image from "next/image";

import Item from "@ui/Item";
import { useEffect, useState } from "react";
import getUsersSummary from "@utils/admin/getInfoSummary";
import { summaryType } from "@mytypes/admin/summaryType";

export default function Admin() {
  const [data, setData] = useState<summaryType | null>(null);
  useEffect(() => {
    async function fetchData() {
      const dataServ = await getUsersSummary();
      setData(dataServ);
    }

    fetchData();
  }, []);

  function checkNumberColor(num: number | undefined) {
    if (!num) return;
    if (num > 0) return "green";
    if (num < 0) return "red";
  }

  function checkNumberSign(num: number | undefined) {
    if (!num) return;
    if (num > 0) return "+";
    if (num < 0) return "";
  }

  return (
    <main>
      {data ? (
        <section className="admin-dashboard">
          <div className="admin-dashboard__info">
            <div className="admin-dashboard__info--title">
              Кол-во зарегестрированных пользователей за месяц
            </div>
            <div className="admin-dashboard__info--description">
              {data?.new_users_stats?.count}
              <span
                className={`admin-dashboard__info--description--sign admin-dashboard__info--description--sign--${checkNumberColor(data?.course_stats?.percent)}`}
              >
                ({checkNumberSign(data?.new_users_stats?.percent)}
                {data?.new_users_stats?.percent}%)
              </span>
            </div>
            {/* <Image/> */}
          </div>
          <div className="admin-dashboard__info">
            {" "}
            <div className="admin-dashboard__info--title">
              Кол-во пройденных курсов за месяц
            </div>
            <div className="admin-dashboard__info--description">
              {data?.course_stats?.count}
              <span
                className={`admin-dashboard__info--description--sign admin-dashboard__info--description--sign--${checkNumberColor(data?.course_stats?.percent)}`}
              >
                ({checkNumberSign(data?.course_stats?.percent)}
                {data?.course_stats?.percent}%)
              </span>
            </div>
            {/* <Image/> */}
          </div>
          <div className="admin-dashboard__info">
            {" "}
            <div className="admin-dashboard__info--title">
              Всего пользователей
            </div>
            <div className="admin-dashboard__info--description">
              {data?.total_users ? data.total_users : "Загрузка..."}
            </div>
            {/* <Image/> */}
          </div>
          <div className="admin-dashboard__info">
            {" "}
            <div className="admin-dashboard__info--title">
              Всего пройденных тестов
            </div>
            <div className="admin-dashboard__info--description">
              {" "}
              {data?.total_tests_passed
                ? data.total_tests_passed
                : "Загрузка..."}
            </div>
            {/* <Image/> */}
          </div>
        </section>
      ) : (
        "Загрузка..."
      )}
    </main>
  );
}
