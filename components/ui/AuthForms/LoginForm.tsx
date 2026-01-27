"use client";
import "./style.scss";

import { useState } from "react";
import { useAuthStore } from "store";
import { post } from "@lib/api";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { setMode } = useAuthStore();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await post("/auth/login", { email, password });
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
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Элекетронная почта"
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

      <button
        type="button"
        className="auth-link"
        onClick={() => setMode("reset")}
      >
        Забыли пароль?
      </button>

      <button className="auth-button" type="submit">
        Войти
      </button>
      <label className="auth-remember">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <span className="custom-checkbox"></span>
        <span>Запомнить меня</span>
      </label>
    </form>
  );
};

export default LoginForm;
