// src/lib/constants.ts

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://147.45.108.163:4000";

export const ROLES = {
  USER: "user",
  ADMIN: "admin",
} as const;

export const PRODUCT_CATEGORIES = ["Electronics", "Books", "Clothes"] as const;
