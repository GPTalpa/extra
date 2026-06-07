"use client";

import onUpdateUsersData from "@utils/onUpdateUsersData";
import "./style.scss";

import Image from "next/image";
import { useState } from "react";
import { useAuthStore } from "store";

export default function ChangePass() {
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [withErrors, setWithErrors] = useState(false);
  const { loading, setLoading } = useAuthStore();
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordRepeat) {
      setWithErrors(true);
      setError("Пароли не одинаковые");
      return;
    }
    setLoading(true);
    try {
      const data = await onUpdateUsersData({ password: password });
      setLoading(false);
      setWithErrors(false);
      window.location.href = "/profile";
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof Error) {
        setWithErrors(true);
        setError("Неизвестная ошибка");
      } else {
        console.log("Неизвестная ошибка");
      }
    }
  };

  return (
    <main>
      <section className="change_pass">
        <h1>Новый пароль</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Введите новый пароль"
              className={withErrors ? "with-error" : ""}
            />
          </label>

          <label className="auth-field">
            <input
              type="password"
              name="password"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              required
              placeholder="Подтвердите новый пароль"
              className={withErrors ? "with-error" : ""}
            />
          </label>
          <button className="auth-button" type="submit">
            {loading ? (
              <Image
                src="/icon/loading.gif"
                alt="Загрузка"
                width={20}
                height={20}
              />
            ) : withErrors ? (
              error
            ) : (
              "Сменить пароль"
            )}
          </button>
        </form>
      </section>
    </main>
  );
}
