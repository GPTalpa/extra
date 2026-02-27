"use client";
import { post } from "@lib/api";
import "./style.scss";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ROLES } from "@lib/constants";

const RegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [samePass, setSamePass] = useState(true);
  const [withErrors, setWithErrors] = useState(false);

  const [passError, setPassError] = useState("");

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setSamePass(false);
      return;
    }
    try {
      const data = await post("/auth/register/", {
        full_name: fullName,
        password: password,
        password_confirm: repeatPassword,
        role,
        email,
      });
      setWithErrors(false);
      window.location.href = "/check";
    } catch (err: unknown) {
      if (err instanceof Error) {
        setWithErrors(true);
        setPassError(err.message);
      } else {
        console.log("Неизвестная ошибка");
      }
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label className="auth-field">
        <input
          type="text"
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          placeholder="ФИО"
          className={withErrors ? "with-error" : ""}
        />
      </label>

      <label className="auth-field">
        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ color: "#646464" }}
          required
          className={withErrors ? "with-error" : ""}
        >
          <option value="" disabled hidden>
            Роль
          </option>
          {ROLES.map((r) => (
            <option key={r.key} value={r.key}>
              {r.name}
            </option>
          ))}
        </select>
      </label>
      <label className="auth-field">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Электронная почта"
          className={withErrors ? "with-error" : ""}
        />
      </label>

      <label className="auth-field">
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Пароль"
          className={samePass && !withErrors ? "" : "with-error"}
        />
      </label>

      <label className="auth-field">
        <input
          type="password"
          name="repeatPassword"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
          placeholder="Повтор пароля"
          className={samePass && !withErrors ? "" : "with-error"}
        />
      </label>

      <button className="auth-button" type="submit">
        {withErrors
          ? passError
            ? passError
            : "Проверьте заполненные данные"
          : "Зарегистрироваться"}
      </button>
    </form>
  );
};

export default RegisterForm;
