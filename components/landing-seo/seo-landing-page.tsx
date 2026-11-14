"use client"

import { useState, useEffect, useRef, type FormEvent } from "react"
import Image from "next/image"
import { submitLandingLead, type LandingLeadResult } from "@/lib/submit-landing-lead"
import {
  ENGINES,
  SEARCH_QUERIES,
  CASE_CARDS,
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

function hexToRgba(hex: string, alpha: number) {
  if (typeof hex !== "string" || !/^#?[0-9a-fA-F]{6}$/.test(hex)) return `rgba(26,106,255,${alpha})`
  const h = hex.replace("#", "")
  const r = parseInt(h.substring(0, 2), 16), g = parseInt(h.substring(2, 4), 16), b = parseInt(h.substring(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

export default function SeoLandingPage() {
  const [formOpen, setFormOpen] = useState(false)
  const [footerSent, setFooterSent] = useState<string | null>(null)
  const [popupSent, setPopupSent] = useState<string | null>(null)
  const [footerErrors, setFooterErrors] = useState<Record<string, string>>({})
  const [popupErrors, setPopupErrors] = useState<Record<string, string>>({})
  const [footerSubmitting, setFooterSubmitting] = useState(false)
  const [popupSubmitting, setPopupSubmitting] = useState(false)

  const [engine, setEngine] = useState(0)
  const [typed, setTyped] = useState("")
  const [caretOn, setCaretOn] = useState(true)

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

  useEffect(() => {
    let qi = 0, ci = 0, phase: "type" | "hold" | "erase" = "type"
    let timer: ReturnType<typeof setTimeout>

    function tick() {
      const q = SEARCH_QUERIES[qi]
      if (phase === "type") {
        ci++
        setTyped(q.slice(0, ci))
        if (ci >= q.length) { phase = "hold"; timer = setTimeout(tick, 1500); return }
        timer = setTimeout(tick, 45 + Math.random() * 55)
      } else if (phase === "hold") {
        phase = "erase"
        timer = setTimeout(tick, 250)
      } else {
        ci -= 2
        if (ci <= 0) {
          ci = 0
          qi = (qi + 1) % SEARCH_QUERIES.length
          phase = "type"
          setTyped("")
          setEngine(qi % ENGINES.length)
          timer = setTimeout(tick, 400)
          return
        }
        setTyped(q.slice(0, ci))
        timer = setTimeout(tick, 22)
      }
    }

    timer = setTimeout(tick, 600)
    const blink = setInterval(() => setCaretOn(v => !v), 530)
    return () => { clearTimeout(timer); clearInterval(blink) }
  }, [])

  const openForm = () => { setFormOpen(true); setPopupSent(null); setPopupErrors({}) }
  const closeForm = () => setFormOpen(false)

  function applyResult(r: LandingLeadResult, setErr: (e: Record<string, string>) => void): boolean {
    if (r.success) return true
    if (r.fieldErrors) setErr(r.fieldErrors)
    else setErr({ _: r.error || "Something went wrong." })
    return false
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

  const activeAccent = ENGINES[engine]?.accent ?? "#1A6AFF"

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
        <div className={s.seoSec} style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 32px 84px", position: "relative", display: "flex", gap: 56, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ flex: "1 1 520px", minWidth: 300, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 24 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid rgba(255,255,255,0.24)", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderRadius: 100, padding: "8px 18px 8px 10px" }}>
              <span style={{ width: 26, height: 26, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Image src={`${IMG}/logo-google.webp`} alt="Google" width={16} height={16} style={{ objectFit: "contain" }} />
              </span>
              <span style={{ font: "500 14px 'Poppins', sans-serif", color: "#F5F5F4" }}>Verified <span style={{ color: "#8FB4FF", fontWeight: 600 }}>Google Partner</span> Agency</span>
            </div>
            <h1 style={{ font: "800 clamp(2.3rem,4.2vw,3.7rem)/1.12 'Montserrat', sans-serif", margin: 0, letterSpacing: "-0.015em", maxWidth: 640 }}>
              Google <span style={{ color: "#8FB4FF" }}>Shows Results.</span> AI <span style={{ color: "#8FB4FF" }}>Recommends Businesses.</span> Is Yours Getting Both?
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

          {/* Interactive search demo card */}
          <div style={{ flex: "1 1 440px", minWidth: 300, maxWidth: 560, position: "relative" }}>
            <div style={{ position: "relative", background: "rgba(255,255,255,0.96)", color: "#0A0A0C", border: "1px solid rgba(255,255,255,0.6)", borderRadius: 20, boxShadow: "0 40px 80px rgba(0,0,0,0.45)", padding: 26, overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -110, right: -70, width: 280, height: 280, borderRadius: "50%", background: `radial-gradient(circle,${hexToRgba(activeAccent, 0.16)},${hexToRgba(activeAccent, 0)} 68%)`, pointerEvents: "none", transition: "background 0.4s" }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 18, position: "relative" }}>
                <div style={{ font: "700 17px 'Montserrat', sans-serif", color: "#0A0A0C" }}>Capture demand in</div>
                <div style={{ display: "flex", gap: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF9D2E" }} />
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#D9D9D6" }} />
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#D9D9D6" }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 20, position: "relative" }}>
                {ENGINES.map((eng, i) => {
                  const on = i === engine
                  return (
                    <button key={eng.label} type="button" onClick={() => setEngine(i)} style={{ display: "flex", alignItems: "center", gap: 8, font: "600 14px 'Montserrat', sans-serif", padding: "10px 16px", borderRadius: 100, cursor: "pointer", whiteSpace: "nowrap", border: `1px solid ${on ? eng.accent : "#E2E2DF"}`, color: on ? "#0A0A0C" : "#8A8A90", background: on ? hexToRgba(eng.accent, 0.1) : "#FFFFFF", transition: "all 0.2s" }}>
                      <Image src={eng.src} alt={eng.label} width={17} height={17} style={{ objectFit: "contain", flexShrink: 0 }} />
                      <span>{eng.label}</span>
                    </button>
                  )
                })}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, border: "1px solid #EEEEEC", borderRadius: 100, padding: "16px 22px", background: "#FFFFFF", boxShadow: "0 8px 24px rgba(10,10,12,0.07)", position: "relative" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8A8A90" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}><circle cx="10.5" cy="10.5" r="6.5" /><path d="M20 20l-4.6-4.6" /></svg>
                <div style={{ font: "400 15px/1.4 'Poppins', sans-serif", color: "#0A0A0C", flex: 1, minWidth: 0, minHeight: 21, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {typed}<span style={{ display: "inline-block", width: 1.5, height: 16, background: activeAccent, marginLeft: 2, verticalAlign: -2, opacity: caretOn ? 1 : 0, transition: "background 0.3s" }} />
                </div>
              </div>
              <div style={{ marginTop: 22, borderTop: "1px solid #EEEEEC", paddingTop: 18, position: "relative" }}>
                <div style={{ font: "600 11.5px 'Montserrat', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8A8A90", marginBottom: 10 }}>Who gets found here?</div>
                {[0, 1, 2].map(i => {
                  const you = i === 1
                  return (
                    <div key={i} style={{ display: "flex", gap: 14, alignItems: "center", padding: "12px 0", borderBottom: i < 2 ? "1px solid #F1F1EF" : "none" }}>
                      <div style={{ width: 24, height: 24, borderRadius: 6, background: "#F1F1EF", flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ height: 8, width: `${[72, 60, 50][i]}%`, background: you ? activeAccent : "#E8E8E5", borderRadius: 4, transition: "background 0.3s" }} />
                        <div style={{ height: 6, width: "45%", background: "#F1F1EF", borderRadius: 3, marginTop: 7 }} />
                      </div>
                      <div style={{ font: "600 11px 'Montserrat', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" as const, padding: "5px 9px", borderRadius: 5, flexShrink: 0, color: you ? activeAccent : "#8A8A90", background: you ? hexToRgba(activeAccent, 0.12) : "#F1F1EF", transition: "all 0.3s" }}>
                        {you ? "You" : "Competitor"}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div style={{ font: "400 13px 'Poppins', sans-serif", color: "#A8A8B0", marginTop: 22, paddingLeft: 2 }}>This is where the decision starts — across paid, organic, Maps and AI answers.</div>
          </div>
        </div>
      </section>

      {/* ═══ AEO / GEO INTRO ═══ */}
      <section style={{ background: "#F7F7F5" }}>
        <div className={s.seoSec} style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 32px", display: "flex", gap: 64, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: "1 1 480px", minWidth: 280, display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ font: "600 13px 'Montserrat', sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#1A6AFF" }}>Get Found in AI Answers</div>
            <h2 style={{ font: "700 clamp(2rem,3.6vw,3.2rem)/1.14 'Montserrat', sans-serif", margin: 0, color: "#0A0A0C", letterSpacing: "-0.01em" }}>AEO Services by High Horse: Get Found in AI Answers</h2>
            <p style={{ font: "400 clamp(1rem,1.3vw,1.15rem)/1.7 'Poppins', sans-serif", color: "#55555A", margin: 0, maxWidth: 640 }}>High Horse helps businesses optimise their digital presence through Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO). We ensure your brand appears in AI-generated responses, knowledge panels, and conversational search results so you stay visible, relevant, and ahead where modern search decisions happen.</p>
          </div>
          <div className={s.aeoImage} style={{ flex: "1 1 520px", minWidth: 280, borderRadius: 18, overflow: "hidden", boxShadow: "0 24px 50px rgba(10,10,12,0.14)" }}>
            <Image src={`${IMG}/aeo-geo-v2.jpg`} alt="AI-generated answer featuring a High Horse client's product — demonstrating AEO and GEO optimisation results" width={2115} height={1364} quality={85} sizes="(max-width: 768px) 100vw, 520px" style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
        </div>
      </section>

      {/* ═══ CASE STUDIES ═══ */}
      <section style={{ background: "#FFFFFF" }}>
        <div className={s.seoSec} style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 32px", display: "flex", flexDirection: "column", gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ font: "600 13px 'Montserrat', sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#1A6AFF" }}>Evidence Over Claims</div>
            <h2 style={{ font: "700 clamp(2rem,3.6vw,3.2rem)/1.14 'Montserrat', sans-serif", margin: 0, color: "#0A0A0C", letterSpacing: "-0.01em", maxWidth: 820 }}>Search and digital growth work across industries.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,320px),1fr))", gap: 26 }}>
            {CASE_CARDS.map((c) => (
              <div key={c.name} className={s.caseCard}>
                <div style={{ aspectRatio: "4 / 3", background: "#F4F4F2", overflow: "hidden", borderBottom: "1px solid #EEEEEC" }}>
                  <Image src={c.img} alt={c.name} width={640} height={480} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ padding: "22px 22px 26px", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ font: "600 12px 'Montserrat', sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#1A6AFF" }}>{c.tag}</div>
                  <div style={{ font: "700 18px/1.3 'Montserrat', sans-serif", color: "#0A0A0C" }}>{c.name}</div>
                  <p style={{ font: "400 15px/1.55 'Poppins', sans-serif", color: "#55555A", margin: 0 }}>{c.desc}</p>
                </div>
              </div>
            ))}
            {/* CTA Card */}
            <div className={s.caseCard} style={{ boxShadow: "0 14px 30px rgba(10,10,12,0.06)" }}>
              <div style={{ aspectRatio: "4 / 3", background: "#F4F4F2", overflow: "hidden", borderBottom: "1px solid #EEEEEC" }}>
                <Image src={`${IMG}/case-terra-v2.jpg`} alt="Search funnels that fuel brand growth" width={640} height={480} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ padding: "22px 22px 26px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                <div style={{ font: "600 12px 'Montserrat', sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#1A6AFF" }}>Your Business</div>
                <div style={{ font: "700 18px/1.3 'Montserrat', sans-serif", color: "#0A0A0C" }}>Want results like these?</div>
                <p style={{ font: "400 15px/1.55 'Poppins', sans-serif", color: "#55555A", margin: "0 0 8px" }}>Tell us your goals and we&apos;ll plan the search and digital growth work for your business.</p>
                <button type="button" onClick={openForm} style={{ marginTop: "auto", font: "600 15px 'Montserrat', sans-serif", background: "#1A6AFF", color: "#fff", border: "none", cursor: "pointer", padding: "14px 24px", borderRadius: 8, width: "100%", transition: "transform 0.18s, background 0.18s, box-shadow 0.18s" }} className={s.btnBlueCta}>Get a Quote</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRACK RECORD ═══ */}
      <section style={{ background: "#F7F7F6", borderTop: "1px solid #EAEAE8", borderBottom: "1px solid #EAEAE8" }}>
        <div className={s.seoSec} style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 32px", display: "flex", flexDirection: "column", gap: 64 }}>
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
        <div className={s.seoSec} style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 32px", display: "flex", flexDirection: "column", gap: 48 }}>
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
        <div className={s.seoSec} style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 32px", display: "flex", gap: 56, flexWrap: "wrap", alignItems: "center" }}>
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
        <div className={s.seoSec} style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 32px", display: "flex", flexDirection: "column", gap: 48 }}>
          <h2 style={{ font: "700 clamp(1.5rem,2.75vw,2.3rem)/1.16 'Montserrat', sans-serif", margin: 0, textAlign: "center" }}>Real Results That Got Our <span style={{ color: "#1A6AFF" }}>Clients</span> on <span style={{ color: "#1A6AFF" }}>Google&apos;s First Page</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(max(min(100%,340px),calc((100% - 24px) / 2)),1fr))", gap: 24 }}>
            {RESULTS.map((r) => (
              <div key={r.alt} className={s.resultCard}>
                <div style={{ borderRadius: 10, overflow: "hidden", background: "#FFFFFF", border: "1px solid #E6E6E4", lineHeight: 0 }}>
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
      <section id="how-we-work" style={{ background: "#FAFAF8", borderTop: "1px solid #EEEEEC", borderBottom: "1px solid #EEEEEC" }}>
        <div className={s.seoSec} style={{ maxWidth: 1240, margin: "0 auto", padding: "96px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: 56 }}>
          <h2 style={{ font: "700 clamp(1.9rem,2.8vw,2.6rem)/1.2 'Montserrat', sans-serif", margin: 0, textAlign: "center", maxWidth: 720, color: "#0A0A0C" }}>How We Work to Ensure You <span style={{ color: "#1A6AFF" }}>Rank #1 on Google</span></h2>
          <div className={s.stepGrid} style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", rowGap: 48 }}>
            {WORK_STEPS.map((w) => (
              <div key={w.n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginRight: -10 }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0A0A0C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d={w.icon} />
                </svg>
                <div style={{ width: "100%", height: 96, background: "var(--step-fill)", clipPath: "polygon(0 0,calc(100% - 24px) 0,100% 50%,calc(100% - 24px) 100%,0 100%,24px 50%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 34px 0 38px", boxSizing: "border-box", font: "700 15px/1.3 'Montserrat', sans-serif", color: "#FFFFFF", textAlign: "center" }}>{w.title}</div>
                <div style={{ font: "600 12px 'Montserrat', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--step-active)" }}>Step {w.n}</div>
              </div>
            ))}
          </div>
          <button type="button" onClick={openForm} style={{ font: "600 15px 'Montserrat', sans-serif", background: "#0A0A0C", color: "#fff", border: "none", cursor: "pointer", padding: "18px 36px", borderRadius: 100, transition: "transform 0.18s, background 0.18s" }} className={s.btnDarkHover}>Get a Free Audit</button>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ background: "#FFFFFF" }}>
        <div className={s.seoSec} style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 32px", display: "flex", flexDirection: "column", gap: 56 }}>
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
