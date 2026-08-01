import { NextResponse } from "next/server";

const BASE_URL =
  process.env.API_BASE_URL || "https://zelapi.eu.cc";

export async function POST(request: Request) {
  try {
    // Ambil body request
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim()
        : "";

    // Validasi email
    if (!email) {
      console.error("[PREMIUM] Email kosong");

      return NextResponse.json(
        {
          status: false,
          message: "Email wajib diisi.",
        },
        { status: 400 },
      );
    }

    // Pastikan API Key tersedia
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      console.error("[PREMIUM] API_KEY tidak ditemukan");

      return NextResponse.json(
        {
          status: false,
          message: "API Key belum dikonfigurasi di server.",
        },
        { status: 500 },
      );
    }

    // Endpoint API
    const endpoint = `${BASE_URL}/api/v1/premium/send`;

    console.log(
      `[PREMIUM] Request: POST ${endpoint} | Email: ${email}`,
    );

    // Request ke API
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
      }),
      cache: "no-store",
    });

    // Ambil response sebagai text terlebih dahulu
    const rawResponse = await response.text();

    console.log(
      `[PREMIUM] API HTTP Status: ${response.status}`,
    );

    console.log(
      `[PREMIUM] API Raw Response: ${rawResponse}`,
    );

    // Parse JSON
    let data: any;

    try {
      data = JSON.parse(rawResponse);
    } catch {
      data = {
        status: false,
        message: rawResponse || "Respons API kosong atau tidak valid.",
      };
    }

    console.log(
      `[PREMIUM] API Parsed Response: ${JSON.stringify(data)}`,
    );

    // Jika API mengembalikan error
    if (!response.ok) {
      return NextResponse.json(
        {
          status: false,
          message:
            data?.message ||
            data?.error?.message ||
            "API gagal memproses permintaan.",
          apiStatus: response.status,
          error: data?.error || data,
        },
        {
          status: response.status,
        },
      );
    }

    // Jika berhasil
    return NextResponse.json(
      {
        status: true,
        apiStatus: response.status,
        data,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      `[PREMIUM] Server Error: ${
        error instanceof Error
          ? error.message
          : String(error)
      }`,
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