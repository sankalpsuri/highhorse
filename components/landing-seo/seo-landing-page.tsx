"use client"

import { useState, useEffect, useRef, type FormEvent } from "react"
import Image from "next/image"
import type { ClientLogo } from "@/lib/get-client-logos"
import { submitLandingLead, type LandingLeadResult } from "@/lib/submit-landing-lead"
import {
  AI_SERVICES,
  WHY_STATS,
  WORK_STEPS,
  RESULTS,
  TESTIMONIALS,
  TRACK_RECORD,
} from "./seo-landing-data"
import s from "./seo-landing.module.css"

const IMG = "/assets/landing-seo"

function CheckSvg() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8FB4FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  )
}

function PhoneSvg({ stroke = "#1A6AFF" }: { stroke?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  )
}

function MailSvg({ stroke = "#1A6AFF" }: { stroke?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18v12H3z M3 7l9 6 9-6" />
    </svg>
  )
}

function SuccessIcon() {
  return (
    <div style={{ width: 48, height: 48, borderRadius: 12, background: "#EAF1FF", border: "1px solid #C9D8FB", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A6AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </div>
  )
}

const fieldErrStyle = { font: "400 12px 'Poppins', sans-serif", color: "#D93636", margin: 0 } as const

function FieldErr({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p style={fieldErrStyle}>{msg}</p>
}

function Honeypot() {
  return (
    <div style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }} aria-hidden="true">
      <input type="text" name="address" tabIndex={-1} autoComplete="off" />
    </div>
  )
}

interface SeoLandingPageProps {
  logos: ClientLogo[]
}

export default function SeoLandingPage({ logos }: SeoLandingPageProps) {
  const [formOpen, setFormOpen] = useState(false)
  const [heroSent, setHeroSent] = useState<string | null>(null)
  const [footerSent, setFooterSent] = useState<string | null>(null)
  const [popupSent, setPopupSent] = useState<string | null>(null)
  const [heroErrors, setHeroErrors] = useState<Record<string, string>>({})
  const [footerErrors, setFooterErrors] = useState<Record<string, string>>({})
  const [popupErrors, setPopupErrors] = useState<Record<string, string>>({})
  const [heroSubmitting, setHeroSubmitting] = useState(false)
  const [footerSubmitting, setFooterSubmitting] = useState(false)
  const [popupSubmitting, setPopupSubmitting] = useState(false)

  const ctxRef = useRef({
    page_url: "", referrer: "", user_agent: "",
    utm_source: "", utm_medium: "", utm_campaign: "", utm_term: "", utm_content: "",
  })

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    ctxRef.current = {
      page_url: window.location.href, referrer: document.referrer, user_agent: navigator.userAgent,
      utm_source: p.get("utm_source") || "", utm_medium: p.get("utm_medium") || "",
      utm_campaign: p.get("utm_campaign") || "", utm_term: p.get("utm_term") || "",
      utm_content: p.get("utm_content") || "",
    }
  }, [])

  const openForm = () => { setFormOpen(true); setPopupSent(null); setPopupErrors({}) }
  const closeForm = () => setFormOpen(false)

  function applyResult(r: LandingLeadResult, setErr: (e: Record<string, string>) => void): boolean {
    if (r.success) return true
    if (r.fieldErrors) setErr(r.fieldErrors)
    else setErr({ _: r.error || "Something went wrong." })
    return false
  }

  async function handleHeroSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setHeroErrors({})
    setHeroSubmitting(true)
    const fd = new FormData(e.currentTarget)
    const phone = `${fd.get("code") || "+91"} ${fd.get("phone") || ""}`
    const result = await submitLandingLead({
      landing_page: "seo-landing", form_location: "hero",
      name: String(fd.get("name") || ""), email: String(fd.get("email") || ""),
      phone, website_url: String(fd.get("website") || ""),
      honeypot: String(fd.get("address") || ""),
      ...ctxRef.current,
    })
    setHeroSubmitting(false)
    if (applyResult(result, setHeroErrors)) {
      setHeroSent(String(fd.get("name") || "").trim().split(" ")[0] || "there")
    }
  }

  async function handleFooterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFooterErrors({})
    setFooterSubmitting(true)
    const fd = new FormData(e.currentTarget)
    const result = await submitLandingLead({
      landing_page: "seo-landing", form_location: "footer",
      name: String(fd.get("name") || ""), email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""), problem: String(fd.get("problem") || ""),
      message: String(fd.get("message") || ""),
      honeypot: String(fd.get("address") || ""),
      ...ctxRef.current,
    })
    setFooterSubmitting(false)
    if (applyResult(result, setFooterErrors)) {
      setFooterSent(String(fd.get("name") || "").trim().split(" ")[0] || "there")
    }
  }

  async function handlePopupSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPopupErrors({})
    setPopupSubmitting(true)
    const fd = new FormData(e.currentTarget)
    const result = await submitLandingLead({
      landing_page: "seo-landing", form_location: "popup",
      name: String(fd.get("name") || ""), email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""), problem: String(fd.get("problem") || ""),
      message: String(fd.get("message") || ""),
      honeypot: String(fd.get("address") || ""),
      ...ctxRef.current,
    })
    setPopupSubmitting(false)
    if (applyResult(result, setPopupErrors)) {
      setPopupSent(String(fd.get("name") || "").trim().split(" ")[0] || "there")
      setTimeout(() => setFormOpen(false), 2000)
    }
  }

  const doubledLogos = [...logos, ...logos]

  return (
    <div className={s.pageWrap} style={{ fontFamily: "'Poppins', sans-serif", color: "#0A0A0C", background: "#FFFFFF", overflowX: "clip" }}>

      {/* ═══ NAV ═══ */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.82)", backdropFilter: "blur(14px) saturate(1.6)", WebkitBackdropFilter: "blur(14px) saturate(1.6)", borderBottom: "1px solid #EAEAE8" }}>
        <div className={s.navInner}>
          <div className={s.navLogo}>
            <Image src={`${IMG}/hh-logo.png`} alt="High Horse" width={26} height={26} style={{ objectFit: "contain", flexShrink: 0 }} />
            <span className={s.navLogoText}>HIGH HORSE</span>
          </div>
          <div className={s.navRight}>
            <a href="tel:+918287194831" className={s.navLink} aria-label="Call +91-82871 94831">
              <span className={s.navBadge}>
                <PhoneSvg />
              </span>
              <span className={s.navContactText}>+91-82871 94831</span>
            </a>
            <a href="mailto:contact@highhorse.in" className={s.navEmailLink} aria-label="Email contact@highhorse.in">
              <span className={s.navBadge}>
                <MailSvg />
              </span>
              <span className={s.navContactText}>contact@highhorse.in</span>
            </a>
            <button type="button" className={s.btnDarkNav} onClick={openForm}>Contact Us</button>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{ position: "relative", overflow: "hidden", background: "#07080D", color: "#F5F5F4" }}>
        <div style={{ position: "absolute", top: -220, right: -120, width: 760, height: 760, borderRadius: "50%", background: "radial-gradient(circle,rgba(26,106,255,0.32),rgba(26,106,255,0) 66%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -300, left: -200, width: 820, height: 820, borderRadius: "50%", background: "radial-gradient(circle,rgba(132,84,230,0.34),rgba(132,84,230,0) 64%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "30%", left: "38%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle,rgba(40,170,190,0.14),rgba(40,170,190,0) 66%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "56px 56px", maskImage: "radial-gradient(100% 80% at 30% 20%,#000 20%,transparent 80%)", WebkitMaskImage: "radial-gradient(100% 80% at 30% 20%,#000 20%,transparent 80%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 32px 84px", position: "relative", display: "flex", gap: 56, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ flex: "1 1 520px", minWidth: 300, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 24 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid rgba(255,255,255,0.24)", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderRadius: 100, padding: "8px 18px 8px 10px" }}>
              <span style={{ width: 26, height: 26, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Image src={`${IMG}/logo-google.webp`} alt="Google" width={16} height={16} style={{ objectFit: "contain" }} />
              </span>
              <span style={{ font: "500 14px 'Poppins', sans-serif", color: "#F5F5F4" }}>Verified <span style={{ color: "#8FB4FF", fontWeight: 600 }}>Google Partner</span> Agency</span>
            </div>
            <h1 style={{ font: "800 clamp(2.3rem,4.2vw,3.7rem)/1.12 'Montserrat', sans-serif", margin: 0, letterSpacing: "-0.015em", maxWidth: 640 }}>
              <span style={{ color: "#8FB4FF" }}>Strategic SEO</span> That Gets You <span style={{ color: "#8FB4FF" }}>Ranked, Visible &amp; Profitable</span>
            </h1>
            <div style={{ font: "700 clamp(1.2rem,1.7vw,1.5rem)/1.3 'Montserrat', sans-serif", color: "#FFFFFF" }}>Top SEO Services in India</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["40+ Industries Served", "₹5Cr+ revenue generated", "90% referral business rate"].map((txt) => (
                <div key={txt} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 24, height: 24, borderRadius: 7, background: "rgba(26,106,255,0.18)", border: "1px solid rgba(91,146,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <CheckSvg />
                  </span>
                  <span style={{ font: "400 16px 'Poppins', sans-serif", color: "#E6E6E4" }}>{txt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero form */}
          <div style={{ flex: "0 1 440px", minWidth: 300, background: "#fff", color: "#0A0A0C", borderRadius: 18, boxShadow: "0 30px 70px rgba(0,0,0,0.4)", overflow: "hidden" }}>
            {!heroSent ? (
              <form onSubmit={handleHeroSubmit} style={{ padding: "30px 28px 28px", display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
                <Honeypot />
                <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <span style={{ font: "500 13px 'Poppins', sans-serif", color: "#0A0A0C" }}>Name <span style={{ color: "#D93636" }}>*</span></span>
                  <input name="name" type="text" required placeholder="Your full name" className={s.inputLight} />
                  <FieldErr msg={heroErrors.name} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <span style={{ font: "500 13px 'Poppins', sans-serif", color: "#0A0A0C" }}>Email <span style={{ color: "#D93636" }}>*</span></span>
                  <input name="email" type="email" required placeholder="you@company.com" className={s.inputLight} />
                  <FieldErr msg={heroErrors.email} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <span style={{ font: "500 13px 'Poppins', sans-serif", color: "#0A0A0C" }}>Phone <span style={{ color: "#D93636" }}>*</span></span>
                  <div className={s.phoneWrap}>
                    <select name="code" style={{ font: "500 14px 'Poppins', sans-serif", color: "#0A0A0C", border: "none", borderRight: "1px solid #E6E6E4", background: "#F7F7F6", padding: "0 10px", outline: "none", cursor: "pointer" }}>
                      <option value="+91">IN +91</option>
                      <option value="+1">US +1</option>
                      <option value="+44">UK +44</option>
                      <option value="+971">AE +971</option>
                    </select>
                    <input name="phone" type="tel" required placeholder="82871 94831" style={{ font: "400 15px 'Poppins', sans-serif", color: "#0A0A0C", border: "none", padding: "13px 14px", outline: "none", background: "transparent", flex: 1, minWidth: 0 }} />
                  </div>
                  <FieldErr msg={heroErrors.phone} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <span style={{ font: "500 13px 'Poppins', sans-serif", color: "#0A0A0C" }}>Website URL <span style={{ color: "#D93636" }}>*</span></span>
                  <input name="website" type="url" required placeholder="https://yourwebsite.com" className={s.inputLight} />
                  <FieldErr msg={heroErrors.website_url} />
                </label>
                {heroErrors._ && <p style={fieldErrStyle}>{heroErrors._}</p>}
                <button type="submit" className={s.btnHeroCta} disabled={heroSubmitting}>
                  {heroSubmitting ? "Sending…" : "Book a Strategy Call"}
                </button>
              </form>
            ) : (
              <div style={{ padding: "44px 30px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14 }}>
                <SuccessIcon />
                <h3 style={{ font: "700 22px/1.2 'Montserrat', sans-serif", margin: 0 }}>Thank you, {heroSent}.</h3>
                <p style={{ font: "400 15px/1.6 'Poppins', sans-serif", color: "#55555A", margin: 0 }}>Your strategy call request has been received. Our team will contact you shortly.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ CLIENT LOGOS ═══ */}
      <section style={{ background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "88px 32px 44px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14 }}>
          <h2 style={{ font: "700 clamp(1.9rem,2.8vw,2.6rem)/1.16 'Montserrat', sans-serif", margin: 0 }}>What Do <span style={{ color: "#1A6AFF" }}>High-Growth Brands</span> Rely On?</h2>
          <p style={{ font: "500 clamp(1.05rem,1.4vw,1.25rem)/1.5 'Poppins', sans-serif", color: "#3A3A3E", margin: 0, maxWidth: 640 }}>SEO partner that turns search visibility into consistent business growth.</p>
        </div>
        <div style={{ overflow: "hidden", maskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)" }}>
          <div className={s.marqueeTrack}>
            {doubledLogos.map((logo, i) => (
              <div key={i} className={s.logoImgWrap}>
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  width={logo.width}
                  height={logo.height}
                  className={s.clientLogo}
                  style={{ width: logo.displayWidth, height: logo.displayHeight }}
                />
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", padding: "44px 32px 96px" }}>
          <button type="button" className={s.btnDark} onClick={openForm}>Free SEO Strategy Call</button>
        </div>
      </section>

      {/* ═══ TRACK RECORD ═══ */}
      <section style={{ background: "#F7F7F6", borderTop: "1px solid #EAEAE8", borderBottom: "1px solid #EAEAE8" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 32px", display: "flex", flexDirection: "column", gap: 64 }}>
          <h2 style={{ font: "700 clamp(1.9rem,2.8vw,2.6rem)/1.16 'Montserrat', sans-serif", margin: 0, textAlign: "center" }}>A <span style={{ color: "#1A6AFF" }}>Track Record</span> Built on <span style={{ color: "#1A6AFF" }}>Performance</span></h2>
          {TRACK_RECORD.map((client) => (
            <div key={client.logoAlt} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <Image src={client.logo} alt={client.logoAlt} width={260} height={client.logoH} style={{ height: client.logoH, width: "auto", maxWidth: 260, objectFit: "contain", objectPosition: "left center", alignSelf: "flex-start" }} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 28 }}>
                {client.serps.map((serp) => (
                  <div key={serp.alt} className={s.serpCard}>
                    <Image src={serp.img} alt={serp.alt} width={600} height={480} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left", display: "block" }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="button" className={s.btnDark} onClick={openForm}>Increase Organic Traffic</button>
          </div>
        </div>
      </section>

      {/* ═══ AI SEO SERVICES ═══ */}
      <section style={{ background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 32px", display: "flex", flexDirection: "column", gap: 48 }}>
          <h2 style={{ font: "700 clamp(1.9rem,2.8vw,2.6rem)/1.16 'Montserrat', sans-serif", margin: 0, textAlign: "center" }}>Top <span style={{ color: "#1A6AFF" }}>AI SEO Services</span> Helping <span style={{ color: "#1A6AFF" }}>Delhi NCR Businesses Grow</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
            {AI_SERVICES.map((svc) => (
              <div key={svc.title} className={s.serviceCard}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "#F4F4F2", border: "1px solid #E6E6E4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A0A0C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d={svc.icon} />
                    </svg>
                  </div>
                  <h3 style={{ font: "700 19px/1.25 'Montserrat', sans-serif", margin: 0 }}>{svc.title}</h3>
                </div>
                <p style={{ font: "400 14.5px/1.65 'Poppins', sans-serif", color: "#3A3A3E", margin: 0 }}>{svc.body}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="button" className={s.btnDark} onClick={openForm}>Talk to SEO Expert</button>
          </div>
        </div>
      </section>

      {/* ═══ WHY HIGH HORSE STATS ═══ */}
      <section style={{ background: "#F7F7F6", borderTop: "1px solid #EAEAE8", borderBottom: "1px solid #EAEAE8" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 32px", display: "flex", gap: 56, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: "1 1 340px", minWidth: 280, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 20 }}>
            <h2 style={{ font: "700 clamp(1.9rem,2.8vw,2.6rem)/1.2 'Montserrat', sans-serif", margin: 0, maxWidth: 420 }}>Why <span style={{ color: "#1A6AFF" }}>Delhi NCR</span> Businesses Choose <span style={{ color: "#1A6AFF" }}>High Horse</span></h2>
            <p style={{ font: "400 15.5px/1.7 'Poppins', sans-serif", color: "#3A3A3E", margin: "0 0 16px", maxWidth: 440 }}>Businesses choose High Horse for our AI-driven SEO strategies, transparent execution, and measurable results. We understand local search behavior, competitive markets, and focus on driving qualified traffic, higher rankings, and consistent growth not just reports.</p>
            <button type="button" className={s.btnDark} style={{ padding: "18px 34px" }} onClick={openForm}>Boost Your Rankings Today</button>
          </div>
          <div style={{ flex: "1.5 1 520px", minWidth: 300, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18 }}>
            {WHY_STATS.map((st) => (
              <div key={st.l} className={s.statCard}>
                <div style={{ font: "700 clamp(1.8rem,2.6vw,2.3rem)/1 'Montserrat', sans-serif", color: "#1A6AFF", letterSpacing: "-0.01em" }}>{st.v}</div>
                <div style={{ font: "500 13.5px/1.45 'Poppins', sans-serif", color: "#0A0A0C", maxWidth: 150, textWrap: "balance" as never }}>{st.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REAL RESULTS ═══ */}
      <section style={{ background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 32px", display: "flex", flexDirection: "column", gap: 48 }}>
          <h2 style={{ font: "700 clamp(1.9rem,2.8vw,2.6rem)/1.16 'Montserrat', sans-serif", margin: 0, textAlign: "center" }}>Real Results That Got Our <span style={{ color: "#1A6AFF" }}>Clients</span> on <span style={{ color: "#1A6AFF" }}>Google&apos;s First Page</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(max(min(100%,340px),calc((100% - 24px) / 2)),1fr))", gap: 24 }}>
            {RESULTS.map((r) => (
              <div key={r.alt} className={s.resultCard}>
                <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #e4e4e4", lineHeight: 0 }}>
                  <Image src={r.img} alt={r.alt} width={2008} height={730} style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "0 8px", flex: 1 }}>
                  {r.points.map((pt) => (
                    <div key={pt} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1A6AFF", flexShrink: 0, marginTop: 9 }} />
                      <span style={{ font: "400 15.5px/1.55 'Poppins', sans-serif", color: "#0A0A0C" }}>{pt}</span>
                    </div>
                  ))}
                </div>
                <button type="button" className={s.btnDarkSmall} style={{ alignSelf: "center" }} onClick={openForm}>Book Free SEO Call</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW WE WORK ═══ */}
      <section style={{ background: "#0A0A0C", color: "#F5F5F4", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)", backgroundSize: "56px 56px", maskImage: "radial-gradient(100% 80% at 50% 0%,#000 30%,transparent 85%)", WebkitMaskImage: "radial-gradient(100% 80% at 50% 0%,#000 30%,transparent 85%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -200, right: -120, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(26,106,255,0.28),rgba(26,106,255,0) 66%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "100px 32px", position: "relative", display: "flex", flexDirection: "column", gap: 56 }}>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div style={{ flex: "1 1 520px", minWidth: 280 }}>
              <div style={{ font: "600 11.5px 'Montserrat', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#FF9D2E", marginBottom: 16 }}>10-step process</div>
              <h2 style={{ font: "700 clamp(1.9rem,2.8vw,2.6rem)/1.16 'Montserrat', sans-serif", margin: 0, maxWidth: 620 }}>How We Work to Ensure You <span style={{ color: "#8FB4FF" }}>Rank #1 on Google</span></h2>
            </div>
            <button type="button" className={s.btnWhite} onClick={openForm}>Get a Free Audit</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", columnGap: 0, rowGap: 40 }}>
            {WORK_STEPS.map((w) => (
              <div key={w.n} className={s.workStep}>
                <div style={{ position: "absolute", top: -5, left: 0, width: 9, height: 9, borderRadius: "50%", background: "#1A6AFF", boxShadow: "0 0 0 4px rgba(26,106,255,0.2)" }} />
                <div style={{ font: "700 13px 'Montserrat', sans-serif", letterSpacing: "0.08em", color: "#FF9D2E" }}>{w.n}</div>
                <div style={{ width: 52, height: 52, borderRadius: 13, background: "rgba(255,255,255,0.04)", border: "1px solid #2E2E31", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5F5F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={w.icon} />
                  </svg>
                </div>
                <div style={{ font: "600 16.5px/1.35 'Montserrat', sans-serif", color: "#F5F5F4" }}>{w.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 32px", display: "flex", flexDirection: "column", gap: 56 }}>
          <h2 style={{ font: "700 clamp(1.9rem,2.8vw,2.6rem)/1.2 'Montserrat', sans-serif", margin: 0, maxWidth: 560 }}><span style={{ color: "#1A6AFF" }}>SEO Success</span> Stories Straight From Our <span style={{ color: "#1A6AFF" }}>Happy Clients</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 32 }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className={s.testimonialCard}>
                <div style={{ width: 120, height: 120, borderRadius: "50%", overflow: "hidden", background: "#F4F4F2", border: "3px solid #fff", boxShadow: "0 0 0 1px #E6E6E4,0 10px 24px rgba(10,10,12,0.1)", flexShrink: 0 }}>
                  <Image src={t.img} alt={t.name} width={240} height={240} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: t.pos, transform: `scale(${t.zoom})`, transformOrigin: t.pos, display: "block" }} />
                </div>
                <svg width="30" height="22" viewBox="0 0 30 22" fill="#1A6AFF" style={{ marginTop: 6 }}>
                  <path d="M0 22V13C0 5.8 3.6 1.4 10.8 0l1.6 3.2C8.6 4.4 6.6 6.8 6.2 10H12v12z M17 22V13c0-7.2 3.6-11.6 10.8-13l1.6 3.2C25.6 4.4 23.6 6.8 23.2 10H29v12z" />
                </svg>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <div style={{ font: "500 16px/1.4 'Poppins', sans-serif", color: "#1A6AFF" }}>{t.name}</div>
                  <div style={{ font: "700 15px/1.4 'Montserrat', sans-serif", color: "#1A6AFF" }}>{t.company}</div>
                </div>
                <p style={{ font: "400 14.5px/1.65 'Poppins', sans-serif", color: "#144FC0", margin: "8px 0 0" }}>{t.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: "#0A0A0C", color: "#F5F5F4" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px 56px", display: "flex", gap: 56, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 340px", minWidth: 280, display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Image src={`${IMG}/hh-logo.png`} alt="High Horse" width={22} height={22} style={{ objectFit: "contain", filter: "invert(1) brightness(2)" }} />
              <span style={{ font: "800 15px 'Montserrat', sans-serif", letterSpacing: "0.04em" }}>HIGH HORSE</span>
            </div>
            <div>
              <div style={{ font: "600 11.5px 'Montserrat', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#FF9D2E", marginBottom: 12 }}>Contact Us</div>
              <h2 style={{ font: "700 clamp(1.7rem,2.4vw,2.2rem)/1.18 'Montserrat', sans-serif", margin: "0 0 10px" }}>Tell us what you need</h2>
              <p style={{ font: "400 15px/1.6 'Poppins', sans-serif", color: "#9A9A97", margin: 0 }}>We&apos;ll get back to you within one business day.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a href="tel:+918287194831" style={{ display: "flex", alignItems: "center", gap: 12, color: "#F5F5F4", textDecoration: "none" }}>
                <span style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.04)", border: "1px solid #2E2E31", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <PhoneSvg stroke="#FF9D2E" />
                </span>
                <span style={{ font: "500 15px 'Poppins', sans-serif", color: "#F5F5F4" }}>+91-82871 94831</span>
              </a>
              <a href="mailto:contact@highhorse.in" style={{ display: "flex", alignItems: "center", gap: 12, color: "#F5F5F4", textDecoration: "none" }}>
                <span style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.04)", border: "1px solid #2E2E31", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MailSvg stroke="#FF9D2E" />
                </span>
                <span style={{ font: "500 15px 'Poppins', sans-serif", color: "#F5F5F4" }}>contact@highhorse.in</span>
              </a>
            </div>
            <Image src={`${IMG}/google-partner-badge.png`} alt="Google Partner" width={96} height={37} style={{ borderRadius: 5 }} />
          </div>

          {/* Footer form */}
          <div style={{ flex: "1 1 520px", minWidth: 300, border: "1px solid #232326", borderRadius: 16, background: "rgba(255,255,255,0.03)", padding: 30 }}>
            {!footerSent ? (
              <form onSubmit={handleFooterSubmit} style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
                <Honeypot />
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <label style={{ display: "flex", flexDirection: "column", gap: 7, flex: "1 1 220px", minWidth: 200 }}>
                    <span style={{ font: "600 12px 'Montserrat', sans-serif", letterSpacing: "0.04em", color: "#D4D4D1" }}>Name</span>
                    <input name="name" type="text" required placeholder="Your full name" className={s.inputDark} />
                    <FieldErr msg={footerErrors.name} />
                  </label>
                  <label style={{ display: "flex", flexDirection: "column", gap: 7, flex: "1 1 220px", minWidth: 200 }}>
                    <span style={{ font: "600 12px 'Montserrat', sans-serif", letterSpacing: "0.04em", color: "#D4D4D1" }}>Email</span>
                    <input name="email" type="email" required placeholder="you@company.com" className={s.inputDark} />
                    <FieldErr msg={footerErrors.email} />
                  </label>
                </div>
                <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <span style={{ font: "600 12px 'Montserrat', sans-serif", letterSpacing: "0.04em", color: "#D4D4D1" }}>Phone Number</span>
                  <input name="phone" type="tel" required placeholder="+91 00000 00000" className={s.inputDark} />
                  <FieldErr msg={footerErrors.phone} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <span style={{ font: "600 12px 'Montserrat', sans-serif", letterSpacing: "0.04em", color: "#D4D4D1" }}>What problem are you facing?</span>
                  <input name="problem" type="text" required placeholder="e.g. Low leads, high ad costs, poor rankings" className={s.inputDark} />
                  <FieldErr msg={footerErrors.problem} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <span style={{ font: "600 12px 'Montserrat', sans-serif", letterSpacing: "0.04em", color: "#D4D4D1" }}>What do you want from us?</span>
                  <textarea name="message" rows={4} required placeholder="Describe your goals or the help you're looking for" className={s.textareaDark} />
                  <FieldErr msg={footerErrors.message} />
                </label>
                {footerErrors._ && <p style={fieldErrStyle}>{footerErrors._}</p>}
                <button type="submit" className={s.btnBlue} disabled={footerSubmitting}>
                  {footerSubmitting ? "Sending…" : "Submit"}
                </button>
              </form>
            ) : (
              <div style={{ padding: "24px 4px", display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(26,106,255,0.14)", border: "1px solid #1A6AFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A6AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                </div>
                <h3 style={{ font: "700 22px/1.2 'Montserrat', sans-serif", margin: 0 }}>Thank you, {footerSent}.</h3>
                <p style={{ font: "400 15px/1.6 'Poppins', sans-serif", color: "#9A9A97", margin: 0 }}>Your message has been received. Our team will contact you shortly.</p>
              </div>
            )}
          </div>
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 32px", borderTop: "1px solid #232326", font: "400 12px 'Poppins', sans-serif", color: "#5a5a57" }}>
          © 2026 High Horse. All rights reserved.
        </div>
      </footer>

      {/* ═══ CONTACT POPUP ═══ */}
      {formOpen && (
        <div className={s.popupOverlay} onClick={closeForm}>
          <div className={s.popupCard} onClick={(e) => e.stopPropagation()}>
            <div style={{ height: 4, background: "#1A6AFF" }} />
            <button type="button" className={s.popupClose} onClick={closeForm} aria-label="Close">×</button>
            {!popupSent ? (
              <form onSubmit={handlePopupSubmit} style={{ padding: "28px 28px 26px", display: "flex", flexDirection: "column", gap: 14, position: "relative" }}>
                <Honeypot />
                <div>
                  <div style={{ font: "600 11.5px 'Montserrat', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#1A6AFF", marginBottom: 10 }}>Contact Us</div>
                  <h3 style={{ font: "700 24px/1.2 'Montserrat', sans-serif", margin: "0 40px 6px 0" }}>Tell us what you need</h3>
                  <p style={{ font: "400 14.5px/1.6 'Poppins', sans-serif", color: "#55555A", margin: 0 }}>We&apos;ll get back to you within one business day.</p>
                </div>
                <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <span style={{ font: "600 12px 'Montserrat', sans-serif", letterSpacing: "0.04em", color: "#3A3A3E" }}>Name</span>
                  <input name="name" type="text" required placeholder="Your full name" className={s.inputPopup} />
                  <FieldErr msg={popupErrors.name} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <span style={{ font: "600 12px 'Montserrat', sans-serif", letterSpacing: "0.04em", color: "#3A3A3E" }}>Email</span>
                  <input name="email" type="email" required placeholder="you@company.com" className={s.inputPopup} />
                  <FieldErr msg={popupErrors.email} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <span style={{ font: "600 12px 'Montserrat', sans-serif", letterSpacing: "0.04em", color: "#3A3A3E" }}>Phone Number</span>
                  <input name="phone" type="tel" required placeholder="+91 00000 00000" className={s.inputPopup} />
                  <FieldErr msg={popupErrors.phone} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <span style={{ font: "600 12px 'Montserrat', sans-serif", letterSpacing: "0.04em", color: "#3A3A3E" }}>What problem are you facing?</span>
                  <input name="problem" type="text" required placeholder="e.g. Low leads, high ad costs, poor rankings" className={s.inputPopup} />
                  <FieldErr msg={popupErrors.problem} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <span style={{ font: "600 12px 'Montserrat', sans-serif", letterSpacing: "0.04em", color: "#3A3A3E" }}>What do you want from us?</span>
                  <textarea name="message" rows={3} required placeholder="Describe your goals or the help you're looking for" className={s.textareaPopup} />
                  <FieldErr msg={popupErrors.message} />
                </label>
                {popupErrors._ && <p style={fieldErrStyle}>{popupErrors._}</p>}
                <button type="submit" className={s.btnBlue} disabled={popupSubmitting}>
                  {popupSubmitting ? "Sending…" : "Submit"}
                </button>
              </form>
            ) : (
              <div style={{ padding: "44px 32px 40px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14 }}>
                <SuccessIcon />
                <h3 style={{ font: "700 24px/1.2 'Montserrat', sans-serif", margin: 0 }}>Thank you, {popupSent}.</h3>
                <p style={{ font: "400 15px/1.6 'Poppins', sans-serif", color: "#55555A", margin: 0 }}>Your message has been received. Our team will contact you shortly.</p>
                <button type="button" className={s.btnDarkClose} onClick={closeForm}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
