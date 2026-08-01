import { NextResponse } from "next/server";

const BASE_URL = process.env.API_BASE_URL || "https://zelapi.eu.cc";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const link = typeof body.link === "string" ? body.link.trim() : "";

    if (!email || !link) {
      return NextResponse.json(
        { status: false, message: "Email dan link wajib diisi." },
        { status: 400 },
      );
    }

    try {
      new URL(link);
    } catch {
      return NextResponse.json(
        { status: false, message: "Link harus berupa URL yang valid." },
        { status: 400 },
      );
    }

    const response = await fetch(`${BASE_URL}/api/v1/premium/verif`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({ email, link }),
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