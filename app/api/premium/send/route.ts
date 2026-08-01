import { NextResponse } from "next/server";

const BASE_URL = process.env.API_BASE_URL || "https://zelapi.eu.cc";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!email) {
      return NextResponse.json(
        { status: false, message: "Email wajib diisi." },
        { status: 400 },
      );
    }

    const response = await fetch(`${BASE_URL}/api/v1/premium/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({ email }),
      cache: "no-store",
    });

    const data = await response.json().catch(() => ({
      status: false,
      message: "Respons API tidak valid.",
    }));

    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { status: false, message: "Gagal menghubungi server API." },
      { status: 502 },
    );
  }
}