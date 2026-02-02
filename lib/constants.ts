// src/lib/constants.ts

export const API_URL = "https://webcoder-app.ru/api/";

export const ROLES = [
  {
    name: "Пользователь",
    key: 'user'
  },
  {
    name: "Администратор",
    key: 'admin'
  },
  {
    name: "Менеджер",
    key: 'manager'
  },
  {
    name: "Клиент",
    key: 'client'
  }
] as const;

export const PRODUCT_CATEGORIES = ["Electronics", "Books", "Clothes"] as const;
