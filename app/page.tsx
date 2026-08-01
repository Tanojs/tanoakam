import Link from "next/link";
import {
  ArrowRight,
  Check,
  Mail,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/navbar";

const features = [
  {
    icon: Zap,
    title: "Proses sederhana",
    text: "Ikuti alur singkat untuk menghubungkan akun Alight Motion kamu.",
  },
  {
    icon: ShieldCheck,
    title: "Server-side API",
    text: "Kredensial API tidak diletakkan di browser pengguna.",
  },
  {
    icon: Mail,
    title: "Magic Link",
    text: "Kirim dan verifikasi link dari email dengan panduan yang jelas.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <div className="ambient" />
      <Navbar />

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-8 lg:pb-28 lg:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="glass mx-auto mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-slate-600 dark:text-slate-300">
            <Sparkles className="h-4 w-4 text-violet-500" />
            Alight Motion Premium Platform
          </div>

          <h1 className="text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-7xl">
            Premium experience.
            <br />
            <span className="text-gradient">Simplified.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
            Platform modern untuk membantu proses aktivasi Alight Motion Premium
            melalui alur Magic Link yang simpel dan mudah dipahami.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/premium" className="btn-primary">
              Mulai Sekarang
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#cara-kerja"
              className="glass inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold text-slate-700 transition hover:bg-white/80 dark:text-slate-200 dark:hover:bg-white/10"
            >
              Lihat Cara Kerja
            </a>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-5xl animate-float">
          <div className="glass-strong rounded-[2rem] p-2 shadow-glass">
            <div className="rounded-[1.6rem] border border-white/20 bg-gradient-to-br from-violet-500/10 via-transparent to-blue-500/10 p-5 sm:p-8">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Premium Generator
                  </p>
                  <h2 className="mt-1 text-xl font-bold">Activate your account</h2>
                </div>
                <div className="rounded-xl bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Ready
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {["Enter Email", "Verify Link", "Premium Active"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className="glass rounded-2xl p-5"
                    >
                      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-sm font-bold text-violet-600 dark:text-violet-400">
                        {index + 1}
                      </div>
                      <p className="font-semibold">{item}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {index === 0
                          ? "Masukkan email akun."
                          : index === 1
                            ? "Paste URL dari email."
                            : "Selesai dan login di aplikasi."}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8" id="cara-kerja">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-500">
            Simple workflow
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Dibuat agar tidak membingungkan.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="glass rounded-3xl p-7 transition hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{feature.title}</h3>
                <p className="mt-2 leading-6 text-slate-600 dark:text-slate-400">
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="glass-strong overflow-hidden rounded-[2rem] p-8 sm:p-12">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-3xl font-bold">Siap mulai?</h2>
              <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-400">
                Masuk ke generator dan ikuti langkah yang ditampilkan di layar.
              </p>
            </div>
            <Link href="/premium" className="btn-primary">
              Buka Generator
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/5 py-8 text-center text-sm text-slate-500 dark:border-white/10">
        © {new Date().getFullYear()} Alight Motion Premium Platform
      </footer>
    </main>
  );
}