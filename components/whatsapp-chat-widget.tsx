"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

const WA_URL =
  "https://wa.me/918287194831?text=Hi!%20How%20can%20we%20help%20you%20today%3F"

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"
        fill="currentColor"
      />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="#1a1a1a"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14m-6-6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function WhatsAppChatWidget({
  landingPage,
}: {
  landingPage: "seo-landing" | "sem-landing"
}) {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close()
    }
    if (open) {
      document.addEventListener("keydown", onKey)
      return () => document.removeEventListener("keydown", onKey)
    }
  }, [open, close])

  function handleChatClick() {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      ;(window as any).dataLayer.push({
        event: "whatsapp_click",
        landing_page: landingPage,
      })
    }
    window.open(WA_URL, "_blank", "noopener")
  }

  return (
    <>
      {/* ── Open state: card + round close button ── */}
      {open && (
        <div
          className="wa-widget-wrap"
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 90,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 0,
          }}
        >
          {/* Speech-bubble card */}
          <div className="wa-card" style={{
            position: "relative",
            width: 360,
            maxWidth: "min(360px, calc(100vw - 32px))",
            background: "#fff",
            borderRadius: 28,
            border: "2px solid #1a1a1a",
            boxShadow: "8px 8px 0 0 #00E785",
            padding: 24,
            fontFamily: "'Poppins', sans-serif",
            marginBottom: 0,
          }}>
            {/* Tail */}
            <div style={{
              position: "absolute",
              bottom: -18,
              right: 28,
              width: 0,
              height: 0,
            }}>
              {/* Green shadow tail (offset 8px right, 8px down) */}
              <div style={{
                position: "absolute",
                top: 8,
                left: 8,
                width: 0,
                height: 0,
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderTop: "18px solid #00E785",
              }} />
              {/* Border tail */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderTop: "18px solid #1a1a1a",
              }} />
              {/* White fill tail */}
              <div style={{
                position: "absolute",
                top: -2,
                left: 1,
                width: 0,
                height: 0,
                borderLeft: "9px solid transparent",
                borderRight: "9px solid transparent",
                borderTop: "16px solid #fff",
              }} />
            </div>

            {/* Top row: logo + name */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 20,
            }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#fff",
                boxShadow: "0 2px 10px rgba(0,0,0,0.10), 0 0 0 3px #fff",
                overflow: "hidden",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Image
                  src="/assets/hh-logo.png"
                  alt="High Horse"
                  width={58}
                  height={58}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
              </div>
              <div style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: 20,
                color: "#1a1a1a",
                lineHeight: 1.2,
              }}>
                High Horse
              </div>
            </div>

            {/* Message */}
            <div style={{
              fontSize: 24,
              fontWeight: 400,
              color: "#1a1a1a",
              lineHeight: 1.35,
              marginBottom: 24,
            }}>
              Hi there!<br />
              How can I help you?
            </div>

            {/* CTA button */}
            <button
              type="button"
              onClick={handleChatClick}
              style={{
                width: "100%",
                height: 56,
                background: "#1f1f1f",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                boxShadow: "4px 4px 0 0 #00E785",
                transition: "transform 0.12s, box-shadow 0.12s",
                position: "relative",
                padding: "0 20px",
              }}
            >
              <span style={{ display: "flex", alignItems: "center" }}>
                <WhatsAppIcon size={20} />
              </span>
              <span style={{ flex: 1, textAlign: "center" }}>Chat With Us</span>
              <span style={{ display: "flex", alignItems: "center" }}>
                <ArrowRightIcon />
              </span>
            </button>
          </div>

          {/* Spacer for the tail */}
          <div style={{ height: 22, flexShrink: 0 }} />

          {/* Round close button */}
          <button
            type="button"
            onClick={close}
            aria-label="Close chat widget"
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#00E785",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                "0 4px 14px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.08)",
              transition: "transform 0.15s",
              flexShrink: 0,
            }}
          >
            <ChevronDownIcon />
          </button>
        </div>
      )}

      {/* ── Closed state: round green icon button ── */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Chat on WhatsApp"
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 90,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#00E785",
            color: "#fff",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow:
              "0 4px 14px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.08)",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
        >
          <WhatsAppIcon size={34} />
        </button>
      )}

      <style>{`
        @media (max-width: 639px) {
          .wa-card {
            max-width: calc(100vw - 32px) !important;
            width: calc(100vw - 32px) !important;
          }
        }
      `}</style>
    </>
  )
}
