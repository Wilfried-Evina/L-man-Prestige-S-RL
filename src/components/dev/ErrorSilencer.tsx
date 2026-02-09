"use client"
import { useEffect } from 'react'

export default function ErrorSilencer() {
  useEffect(() => {
    function onError(ev: ErrorEvent) {
      try {
        const msg = ev?.message || ''
        // silence the specific dev-only removeChild error from Next/React HMR
        if (msg.includes("removeChild") && msg.includes("Cannot read properties of null")) {
          ev.preventDefault()
          if (typeof ev.stopImmediatePropagation === 'function') ev.stopImmediatePropagation()
        }
      } catch (e) {
        // ignore
      }
    }
    window.addEventListener('error', onError)
    return () => window.removeEventListener('error', onError)
  }, [])
  return null
}
