import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://147.45.108.163:4000"; // твой бэк

async function proxy(req: NextRequest, method: string) {
  const path = req.nextUrl.pathname.replace("/api/proxy", ""); // убираем префикс
  const url = `${BACKEND_URL}${path}${req.nextUrl.search}`;

  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    if (key !== "host") headers[key] = value;
  });

  const body =
    method !== "GET" ? await req.json().catch(() => undefined) : undefined;

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}

export async function GET(req: NextRequest) {
  return proxy(req, "GET");
}

export async function POST(req: NextRequest) {
  return proxy(req, "POST");
}

export async function PUT(req: NextRequest) {
  return proxy(req, "PUT");
}

export async function DELETE(req: NextRequest) {
  return proxy(req, "DELETE");
}
