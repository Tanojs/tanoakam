"use client";

import { CheckCircle2, ClipboardPaste, Loader2, Mail, Send, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";

type Step = "email" | "verify" | "success";

type ApiResult = {
  status?: boolean;
  message?: string;
  duration?: string;
  premium?: boolean;
  instructions?: string[];
};

export function Generator() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ApiResult | null>(null);

  async function sendLink(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/premium/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok || !data.status) {
        throw new Error(data.message || "Gagal mengirim Magic Link.");
      }

      setResult(data);
      setStep("verify");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  async function verify(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/premium/verif", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, link }),
      });

      const data = await response.json();

      if (!response.ok || !data.status) {
        throw new Error(data.message || "Verifikasi gagal.");
      }

      setResult(data);
      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep("email");
    setEmail("");
    setLink("");
    setError("");
    setResult(null);
  }

  return (
    <div className="glass-strong rounded-[2rem] p-4 shadow-glass sm:p-7">
      <div className="rounded-[1.5rem] border border-white/20 bg-gradient-to-br from-violet-500/[0.08] to-blue-500/[0.05] p-5 sm:p-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Step {step === "email" ? "1" : step === "verify" ? "2" : "3"} of 3
            </p>
            <h2 className="mt-1 text-xl font-bold">
              {step === "email"
                ? "Kirim Magic Link"
                : step === "verify"
                  ? "Verifikasi Link"
                  : "Premium Berhasil"}
            </h2>
          </div>
          <div className="flex items-center gap-1.5">
            {["email", "verify", "success"].map((item, index) => (
              <span
                key={item}
                className={`h-1.5 rounded-full transition-all ${
                  (step === "email" && index === 0) ||
                  (step === "verify" && index <= 1) ||
                  (step === "success" && index <= 2)
                    ? "w-8 bg-violet-500"
                    : "w-3 bg-slate-300 dark:bg-white/15"
                }`}
              />
            ))}
          </div>
        </div>

        {step === "email" && (
          <form onSubmit={sendLink} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">Email Alight Motion</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full rounded-2xl border border-black/10 bg-white/60 py-3.5 pl-12 pr-4 outline-none transition placeholder:text-slate-400 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-white/[0.05]"
                />
              </div>
            </div>

            <div className="glass rounded-2xl p-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Pastikan email yang dimasukkan adalah email yang digunakan untuk akun
              Alight Motion kamu.
            </div>

            <button disabled={loading} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {loading ? "Mengirim..." : "Kirim Magic Link"}
            </button>
          </form>
        )}

        {step === "verify" && (
          <form onSubmit={verify} className="space-y-5">
            <div className="glass rounded-2xl p-4">
              <p className="text-sm font-semibold">📧 Cek email kamu</p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Buka inbox atau Spam, cari email dari Alight Motion / Alight Creative.
                Jangan tekan tombol login langsung. Tekan dan tahan tombol tersebut,
                lalu pilih <b>Copy URL</b>.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-3.5 text-slate-500 dark:border-white/10 dark:bg-white/[0.03]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Magic Link</label>
              <div className="relative">
                <ClipboardPaste className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  required
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://alightcreative.com/auth/..."
                  className="w-full rounded-2xl border border-black/10 bg-white/60 py-3.5 pl-12 pr-4 outline-none transition focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-white/[0.05]"
                />
              </div>
            </div>

            <button disabled={loading} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
              {loading ? "Memverifikasi..." : "Verifikasi Sekarang"}
            </button>

            <button
              type="button"
              onClick={() => setStep("email")}
              className="w-full text-sm font-semibold text-slate-500 hover:text-violet-500"
            >
              ← Kembali
            </button>
          </form>
        )}

        {step === "success" && (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="mt-6 text-2xl font-bold">Premium Berhasil!</h3>
            <p className="mx-auto mt-3 max-w-md text-slate-600 dark:text-slate-400">
              Akun <b>{email}</b> berhasil diproses. Durasi:{" "}
              <b>{result?.duration || "Premium aktif"}</b>.
            </p>
            <div className="glass mx-auto mt-6 max-w-md rounded-2xl p-4 text-sm text-slate-600 dark:text-slate-400">
              Silakan login ke aplikasi Alight Motion menggunakan email tersebut
              untuk melanjutkan.
            </div>
            <button onClick={reset} className="btn-primary mt-7">
              Proses Akun Lain
            </button>
          </div>
        )}

        {error && (
          <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-medium text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}