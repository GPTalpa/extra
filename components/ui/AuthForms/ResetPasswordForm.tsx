"use client";
import { post } from "@lib/api";
import "./style.scss";

import { useState } from "react";
import Image from "next/image";
import { useAuthStore } from "store";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const { loading, setLoading } = useAuthStore();
  const [withErrors, setWithErrors] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await post("/auth/forgot-passsword", { email });
      setLoading(false);
      setWithErrors(false);
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof Error) {
        setWithErrors(true);
      } else {
        console.log("Неизвестная ошибка");
      }
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div>
        {" "}
        <h2 className="auth-title">Восстановление</h2>
        <p className="auth-subtitle">
          Если аккаунт существует, вы получите письмо
        </p>
      </div>

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

      <button className="auth-button" type="submit">
        {loading ? (
          <Image
            src="/icon/loading.gif"
            alt="Загрузка"
            width={20}
            height={20}
          />
        ) : withErrors ? (
          "Неверная почта"
        ) : (
          "Получить письмо"
        )}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
