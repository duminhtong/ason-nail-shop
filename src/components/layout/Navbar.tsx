import Link from "next/link"
import { getSiteConfig } from "@/lib/supabase-db"

export default async function Navbar() {
  const brandName = (await getSiteConfig("BRAND_NAME")) || "A SÓN NAIL"

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant shadow-lg shadow-primary/10">
      <div className="flex justify-between items-center px-gutter py-sm max-w-container-max mx-auto">
        <button className="text-on-surface hover:text-primary transition-colors duration-300 md:hidden flex items-center justify-center">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="hidden md:flex gap-md items-center font-label-caps text-label-caps uppercase">
          <Link className="text-primary font-bold opacity-80 scale-95 transition-all" href="/">Shop</Link>
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-300" href="#">Mood</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-300" href="/catalogue">Cart</a>
        </div>
        <Link href="/" className="font-h2 text-h2 tracking-tighter text-on-surface uppercase text-center flex-1 md:flex-none">
          {brandName}
        </Link>
        <button className="text-on-surface hover:text-primary transition-colors duration-300 flex items-center justify-center">
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>
    </header>
  )
}
