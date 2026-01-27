"use client";
import { post } from "@lib/api";
import "./style.scss";

import { useState } from "react";

const roles = ["Пользователь", "Администратор", "Менеджер", "Клиент"];

const RegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert("Пароли не совпадают");
      return;
    }
    try {
      const data = await post("/auth/register", {
        fullName,
        password,
        role,
        email,
      });
      console.log("Токен и пользователь:", data);
      console.log("Успешный вход!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
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
        />
      </label>

      <label className="auth-field">
        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ color: "#646464" }}
        >
          <option value="" disabled hidden>
            Роль
          </option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
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
        />
      </label>

      <button className="auth-button" type="submit">
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterForm;
