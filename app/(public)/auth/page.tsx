"use client";

import "./style.scss";

import { useState } from "react";

import { LoginForm, RegisterForm, ResetPasswordForm } from "@ui/AuthForms";
import { useAuthStore } from "store";

export default function Auth() {
  const { mode, setMode } = useAuthStore();

  return (
    <main className="auth">
      {mode === "login" && (
        <div>
          <div className="auth__title">
            <button className="active" onClick={() => setMode("login")}>
              Вход
            </button>{" "}
            | <button onClick={() => setMode("register")}>Регистрация</button>
          </div>
          <LoginForm />
        </div>
      )}
      {mode === "register" && (
        <div>
          <div className="auth__title">
            <button onClick={() => setMode("login")}>Вход</button> |{" "}
            <button className="active" onClick={() => setMode("register")}>
              Регистрация
            </button>
          </div>
          <RegisterForm />
        </div>
      )}
      {mode === "reset" && (
        <div>
          <div className="auth__title">
            <button onClick={() => setMode("login")}>Вход</button> |{" "}
            <button onClick={() => setMode("register")}>Регистрация</button>
          </div>
          <ResetPasswordForm />
        </div>
      )}
    </main>
  );
}
