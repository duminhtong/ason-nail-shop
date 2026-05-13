"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function BottomNav() {
  const pathname = usePathname()
  
  // Only show on client to avoid hydration mismatch if needed, but safe here.
  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl bg-surface-container/90 backdrop-blur-lg border-t border-outline-variant shadow-[0_-8px_24px_rgba(207,188,255,0.1)]">
      <div className="flex justify-around items-center h-xl px-sm pb-safe">
        {/* Active Tab: Shop */}
        <Link 
          href="/" 
          className={`flex flex-col items-center justify-center rounded-xl px-4 py-2 transition-all ${pathname === "/" ? "text-primary bg-primary-container/20 scale-90" : "text-on-surface-variant hover:bg-surface-bright/50"}`}
        >
          <span className="material-symbols-outlined" style={pathname === "/" ? { fontVariationSettings: "'FILL' 1" } : {}}>shopping_bag</span>
          <span className="font-label-caps text-label-caps mt-xs">Shop</span>
        </Link>
        
        <Link 
          href="#" 
          className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2 hover:bg-surface-bright/50 transition-all rounded-xl"
        >
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="font-label-caps text-label-caps mt-xs">Mood</span>
        </Link>
        
        <Link 
          href="/catalogue" 
          className={`flex flex-col items-center justify-center rounded-xl px-4 py-2 transition-all ${pathname === "/catalogue" ? "text-primary bg-primary-container/20 scale-90" : "text-on-surface-variant hover:bg-surface-bright/50"}`}
        >
          <span className="material-symbols-outlined" style={pathname === "/catalogue" ? { fontVariationSettings: "'FILL' 1" } : {}}>shopping_cart</span>
          <span className="font-label-caps text-label-caps mt-xs">Cart</span>
        </Link>
        
        <Link 
          href="https://zalo.me/0987654321" 
          target="_blank"
          className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2 hover:bg-surface-bright/50 transition-all rounded-xl"
        >
          <span className="material-symbols-outlined">chat</span>
          <span className="font-label-caps text-label-caps mt-xs">Zalo</span>
        </Link>
      </div>
    </nav>
  )
}
