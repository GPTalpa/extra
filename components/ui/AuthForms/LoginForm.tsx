"use client";
import "./style.scss";

import { useState } from "react";
import { useAuthStore } from "store";
import { post } from "@lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [withErrors, setWithErrors] = useState(false);
  const { loading, setMode, setLoading } = useAuthStore();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await post("/auth/login/", { email, password });
      console.log(data);
      setLoading(false);
      setWithErrors(false);
      // window.location.href = "/profile";
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof Error) {
        console.log(err.message);
        setWithErrors(true);
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
          className={withErrors ? "with-error" : ""}
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
        {loading ? (
          <Image
            src="/icon/loading.gif"
            alt="Загрузка"
            width={20}
            height={20}
          />
        ) : withErrors ? (
          "Неверная почта или пароль"
        ) : (
          "Войти"
        )}
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
