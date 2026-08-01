import { NextResponse } from "next/server";

const BASE_URL =
  process.env.API_BASE_URL || "https://zelapi.eu.cc";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim()
        : "";

    // Validasi email
    if (!email) {
      return NextResponse.json(
        {
          status: false,
          message: "Email wajib diisi.",
        },
        { status: 400 },
      );
    }

    // Cek API Key
    if (!process.env.API_KEY) {
      console.error("API_KEY tidak ditemukan di Environment Variables.");

      return NextResponse.json(
        {
          status: false,
          message: "API Key belum dikonfigurasi di server.",
        },
        { status: 500 },
      );
    }

    // Kirim request ke API Premium
    const response = await fetch(
      `${BASE_URL}/api/v1/premium/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
        body: JSON.stringify({
          email,
        }),
        cache: "no-store",
      },
    );

    // Ambil response dari API
    const data = await response.json().catch(() => ({
      status: false,
      message: "Respons API tidak valid.",
    }));

    // Log untuk debugging di Vercel
    console.log("=== PREMIUM SEND API ===");
    console.log("Endpoint:", `${BASE_URL}/api/v1/premium/send`);
    console.log("HTTP Status:", response.status);
    console.log("Response:", JSON.stringify(data, null, 2));
    console.log("========================");

    // Teruskan response API ke frontend
    return NextResponse.json(
      {
        status: response.ok,
        apiStatus: response.status,
        data,
      },
      {
        status: response.status,
      },
    );
  } catch (error) {
    console.error(
      "Error saat menghubungi Premium API:",
      error,
    );

    return NextResponse.json(
      {
        status: false,
        message: "Gagal menghubungi server API.",
      },
      {
        status: 502,
      },
    );
  }
}