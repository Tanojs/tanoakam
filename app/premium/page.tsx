import { Generator } from "@/components/generator";
import { Navbar } from "@/components/navbar";

export default function PremiumPage() {
  return (
    <main className="min-h-screen">
      <div className="ambient" />
      <Navbar />
      <section className="mx-auto max-w-4xl px-5 pb-20 pt-12 sm:px-8 sm:pt-20">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex rounded-full bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
            Premium Generator
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Activate Alight Motion Premium
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
            Masukkan email akun Alight Motion, kirim Magic Link, lalu verifikasi
            URL yang kamu salin dari email.
          </p>
        </div>
        <Generator />
      </section>
    </main>
  );
}