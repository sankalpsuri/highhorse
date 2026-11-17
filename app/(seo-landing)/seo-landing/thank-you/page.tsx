"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import s from "@/components/landing-seo/seo-landing.module.css"

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

const IMG = "/assets/landing-seo"

export default function ThankYouPage() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: "lead_form_submit",
      landing_page: "seo-landing",
    })
  }, [])

  return (
    <div
      className={s.pageWrap}
      style={{
        fontFamily: "'Poppins', sans-serif",
        color: "#0A0A0C",
        background: "#FFFFFF",
        overflowX: "clip",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* NAV */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(14px) saturate(1.6)",
          WebkitBackdropFilter: "blur(14px) saturate(1.6)",
          borderBottom: "1px solid #EAEAE8",
        }}
      >
        <div className={s.navInner}>
          <Link
            href="/seo-landing"
            className={s.navLogo}
            style={{ textDecoration: "none", color: "#0A0A0C" }}
          >
            <Image
              src={`${IMG}/hh-logo.png`}
              alt="High Horse"
              width={26}
              height={26}
              style={{ objectFit: "contain", flexShrink: 0 }}
            />
            <span className={s.navLogoText}>HIGH HORSE</span>
          </Link>
          <div className={s.navRight}>
            <a
              href="tel:+918287194831"
              className={s.navLink}
              aria-label="Call +91-82871 94831"
            >
              <span className={s.navBadge}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1A6AFF"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                </svg>
              </span>
              <span className={s.navContactText}>+91-82871 94831</span>
            </a>
            <a
              href="mailto:contact@highhorse.in"
              className={s.navEmailLink}
              aria-label="Email contact@highhorse.in"
            >
              <span className={s.navBadge}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1A6AFF"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18v12H3z M3 7l9 6 9-6" />
                </svg>
              </span>
              <span className={s.navContactText}>contact@highhorse.in</span>
            </a>
            <Link
              href="/seo-landing"
              className={s.btnDarkNav}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>

      {/* THANK YOU */}
      <main
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          background: "#F7F7F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(10,10,12,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(10,10,12,0.05) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(60% 60% at 50% 50%,#000 20%,transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(60% 60% at 50% 50%,#000 20%,transparent 80%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 640,
            height: 640,
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(26,106,255,0.14),rgba(26,106,255,0) 66%)",
            pointerEvents: "none",
          }}
        />
        <div
          className={s.riseIn}
          style={{
            position: "relative",
            maxWidth: 720,
            margin: "0 auto",
            padding: "96px 32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "#fff",
              border: "1px solid #C9D8FB",
              boxShadow: "0 16px 36px rgba(26,106,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1A6AFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </div>
          <h1
            style={{
              font: "700 clamp(2rem,4vw,3.2rem)/1.15 'Montserrat', sans-serif",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Thank you for filling out the form.
          </h1>
          <p
            style={{
              font: "400 clamp(1.05rem,1.4vw,1.25rem)/1.6 'Poppins', sans-serif",
              color: "#55555A",
              margin: 0,
            }}
          >
            Someone will contact you shortly!
          </p>
          <a
            href="https://www.highhorse.in/case-studies"
            className={s.btnBlueQuote}
            style={{ marginTop: 12 }}
          >
            Check out our work
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14 M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </main>
    </div>
  )
}
