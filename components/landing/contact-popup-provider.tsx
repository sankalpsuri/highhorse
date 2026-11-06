'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { ContactPopup } from './contact-popup'

const Ctx = createContext<() => void>(() => {})

export function useOpenContactPopup() {
  return useContext(Ctx)
}

export function ContactPopupProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openPopup = useCallback(() => setOpen(true), [])
  const closePopup = useCallback(() => setOpen(false), [])

  return (
    <Ctx.Provider value={openPopup}>
      {children}
      <ContactPopup open={open} onClose={closePopup} />
    </Ctx.Provider>
  )
}
