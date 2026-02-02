"use client";
import "./style.scss";

import { useState } from "react";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email });
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
        Получить письмо
      </button>
    </form>
  );
};

export default ResetPasswordForm;
