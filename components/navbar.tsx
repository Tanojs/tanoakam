import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 shadow-lg shadow-slate-900/5">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-violet-300 shadow-lg shadow-violet-500/20">
            <Image
              src="/images/logo.png"
              alt="TANO logo"
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
            />
          </span>
          <span>TANO</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/premium"
            className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/10 sm:block"
          >
            Generator
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}