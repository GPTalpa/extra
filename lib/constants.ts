// src/lib/constants.ts

export const API_URL = "https://webcoder-app.ru/api/";

export const ROLES = [
  {
    name: "Монтажник",
    key: "installer",
  },
  {
    name: "Продавец",
    key: "seller",
  },
  {
    name: "Сервесник",
    key: "serviceman",
  },
  {
    name: "Покупатель",
    key: "buyer",
  },
] as const;
