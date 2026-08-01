# Alight Motion Premium

Website Next.js 15 + React + TypeScript dengan UI glassmorphism dan dark/light mode.

## Jalankan

```bash
npm install
```

Buat file `.env.local`:

```env
ZELAPI_BASE_URL=https://zelapi.eu.cc
ZELAPI_API_KEY=API_KEY_KAMU
```

Lalu:

```bash
npm run dev
```

Buka `http://localhost:3000`.

## API

Frontend tidak memanggil API provider secara langsung.

- `POST /api/premium/send`
- `POST /api/premium/verif`

Kedua route tersebut meneruskan request dari server Next.js ke API provider dengan `ZELAPI_API_KEY`.

## Catatan

Project ini adalah starter UI dan integrasi berdasarkan dokumentasi endpoint yang diberikan. Pastikan penggunaan API dan layanan sesuai dengan ketentuan penyedia API serta layanan pihak ketiga yang terkait.