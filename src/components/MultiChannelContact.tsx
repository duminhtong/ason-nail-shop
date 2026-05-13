"use client"

import { useState, useEffect } from "react"
import { ShoppingBag, MessageCircle, Mail, X } from "lucide-react"

interface Props {
  productName: string
}

export default function MultiChannelContact({ productName }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVietnam, setIsVietnam] = useState(true)
  const [showForm, setShowForm] = useState(false)

  // Form State
  const [formData, setFormData] = useState({ name: "", contact: "", note: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const CONTACTS = {
    zalo: process.env.NEXT_PUBLIC_ZALO_PHONE || "0987654321",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "84987654321",
    ig: process.env.NEXT_PUBLIC_IG_USERNAME || "ason.nail",
    email: process.env.NEXT_PUBLIC_EMAIL || "contact@ason.com",
  }

  useEffect(() => {
    // Basic geo-detect via browser locale
    const locale = navigator.language || navigator.languages[0]
    if (locale && !locale.toLowerCase().includes("vi")) {
      setIsVietnam(false)
    }
  }, [])

  const trackClick = (method: string) => {
    // Simplified tracking - in production connect to PostHog/GA
    console.log(`[TRACKING] click_${method} for product: ${productName}`)
  }

  const getLinks = () => {
    const textZalo = encodeURIComponent(`Chào shop, tôi muốn mua: ${productName}`)
    const textGlobal = encodeURIComponent(`Hi, I want to order: ${productName}`)
    const emailBody = encodeURIComponent(`I want to order: ${productName}\n\nPlease provide more details.`)

    return {
      zalo: `https://zalo.me/${CONTACTS.zalo}?text=${textZalo}`,
      whatsapp: `https://wa.me/${CONTACTS.whatsapp}?text=${textGlobal}`,
      instagram: `https://instagram.com/${CONTACTS.ig}`,
      email: `mailto:${CONTACTS.email}?subject=Order Inquiry: ${productName}&body=${emailBody}`,
    }
  }

  const links = getLinks()

  const handleQuickOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          product: productName
        })
      })
      
      if (res.ok) {
        setIsSuccess(true)
        setTimeout(() => {
          setIsOpen(false)
          setShowForm(false)
          setIsSuccess(false)
        }, 3000)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) {
    return (
      <>
        {/* Fixed Mobile Bottom Bar */}
        <div className="fixed bottom-0 left-0 w-full z-40 bg-surface-container/90 backdrop-blur-xl border-t border-outline-variant pb-safe px-gutter pt-md md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full bg-primary text-background font-button py-md rounded-xl glow-button uppercase tracking-widest flex items-center justify-center gap-sm"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            ORDER NOW
          </button>
        </div>

        {/* Desktop Floating Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="hidden md:flex bg-primary text-background font-button px-lg py-sm rounded-full glow-button uppercase items-center gap-sm"
        >
          <span className="material-symbols-outlined">chat</span>
          Contact Us
        </button>
      </>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-[500px] bg-surface-container border border-outline-variant rounded-xl p-4 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-h3 text-h3 text-on-surface">Choose Contact Method</h3>
          <button 
            onClick={() => { setIsOpen(false); setShowForm(false); }}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container-highest transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      {!showForm ? (
        <div className="flex flex-col gap-3">
          {isVietnam ? (
            <>
              {/* Vietnam Primary: Zalo */}
              <a 
                href={links.zalo} target="_blank" rel="noreferrer"
                onClick={() => trackClick("zalo")}
                className="w-full py-4 px-6 bg-[#0068FF] text-white font-button rounded-xl flex items-center justify-center gap-3 hover:bg-[#0055D4] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Chat via Zalo
              </a>
              <a 
                href={links.whatsapp} target="_blank" rel="noreferrer"
                onClick={() => trackClick("whatsapp")}
                className="w-full py-4 px-6 bg-[#25D366] text-white font-button rounded-xl flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp (Global)
              </a>
            </>
          ) : (
            <>
              {/* Global Primary: WhatsApp */}
              <a 
                href={links.whatsapp} target="_blank" rel="noreferrer"
                onClick={() => trackClick("whatsapp")}
                className="w-full py-4 px-6 bg-[#25D366] text-white font-button rounded-xl flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Chat via WhatsApp
              </a>
              <a 
                href={links.zalo} target="_blank" rel="noreferrer"
                onClick={() => trackClick("zalo")}
                className="w-full py-4 px-6 bg-[#0068FF] text-white font-button rounded-xl flex items-center justify-center gap-3 hover:bg-[#0055D4] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Zalo (Vietnam)
              </a>
            </>
          )}

          <a 
            href={links.instagram} target="_blank" rel="noreferrer"
            onClick={() => trackClick("instagram")}
            className="w-full py-4 px-6 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white font-button rounded-xl flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            DM on Instagram
          </a>

          <a 
            href={links.email}
            onClick={() => trackClick("email")}
            className="w-full py-4 px-6 bg-surface-container-high text-on-surface font-button rounded-xl flex items-center justify-center gap-3 hover:bg-surface-container-highest transition-colors"
          >
            <Mail className="w-5 h-5" />
            Send Email
          </a>

          <div className="relative py-3">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-outline-variant"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface-container px-2 text-on-surface-variant font-label-caps">Or</span>
            </div>
          </div>

          <button 
            onClick={() => setShowForm(true)}
            className="w-full py-4 px-6 border border-primary text-primary font-button rounded-xl flex items-center justify-center gap-3 hover:bg-primary/10 transition-colors"
          >
            Quick Order Form
          </button>
        </div>
      ) : (
        <form onSubmit={handleQuickOrder} className="flex flex-col gap-4 animate-in fade-in duration-300">
          {isSuccess ? (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-center font-body-md">
              Order request sent! We will contact you shortly.
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-label-caps text-on-surface-variant mb-1">Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-label-caps text-on-surface-variant mb-1">Contact (Phone/Email)</label>
                <input 
                  required
                  type="text" 
                  value={formData.contact}
                  onChange={e => setFormData({...formData, contact: e.target.value})}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                  placeholder="WhatsApp, Zalo, or Email"
                />
              </div>
              <div>
                <label className="block text-sm font-label-caps text-on-surface-variant mb-1">Note (Optional)</label>
                <textarea 
                  rows={3}
                  value={formData.note}
                  onChange={e => setFormData({...formData, note: e.target.value})}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Quantity, shipping address, etc."
                />
              </div>
              <div className="flex gap-3 mt-2">
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 px-4 border border-outline-variant text-on-surface font-button rounded-xl hover:bg-surface-container-highest transition-colors"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] py-3 px-4 bg-primary text-on-primary font-button rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Submit Order"}
                </button>
              </div>
            </>
          )}
        </form>
      )}
      </div>
    </div>
  )
}
