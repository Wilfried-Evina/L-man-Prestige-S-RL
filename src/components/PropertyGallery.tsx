"use client"
import React, { useState, useCallback, useEffect } from 'react'

export default function PropertyGallery({ images }: { images: string[] }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  if (!images || images.length === 0) return null

  const openLightbox = (i: number) => setLightboxIdx(i)
  const closeLightbox = () => setLightboxIdx(null)

  const goPrev = useCallback(() => {
    setLightboxIdx(prev => prev !== null ? (prev - 1 + images.length) % images.length : null)
  }, [images.length])

  const goNext = useCallback(() => {
    setLightboxIdx(prev => prev !== null ? (prev + 1) % images.length : null)
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIdx === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIdx, goPrev, goNext])

  // Layout: first image big, rest as thumbs (max 2 rows)
  const mainImage = images[0]
  const thumbs = images.slice(1)

  return (
    <>
      {/* Gallery Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Main large image */}
        <div
          onClick={() => openLightbox(0)}
          style={{
            position: 'relative', cursor: 'pointer', borderRadius: '12px', overflow: 'hidden',
            width: '100%', aspectRatio: '16/9', background: '#0a1a2a'
          }}
        >
          <img src={mainImage} alt="Photo principale" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{
            position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
            color: 'white', fontSize: '12px', padding: '4px 12px', borderRadius: '20px'
          }}>
            {images.length} photo{images.length > 1 ? 's' : ''}
          </div>
        </div>

        {/* Thumbnails row */}
        {thumbs.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(thumbs.length, 4)}, 1fr)`,
            gap: '8px'
          }}>
            {thumbs.slice(0, 4).map((u, i) => (
              <div
                key={i}
                onClick={() => openLightbox(i + 1)}
                style={{
                  position: 'relative', cursor: 'pointer', borderRadius: '8px', overflow: 'hidden',
                  aspectRatio: '4/3', background: '#0a1a2a'
                }}
              >
                <img src={u} alt={`Photo ${i + 2}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} />
                {/* Show "+N" overlay on last thumbnail if more images */}
                {i === 3 && thumbs.length > 4 && (
                  <div style={{
                    position: 'absolute', inset: 0, background: 'rgba(5,22,34,0.7)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', color: '#C5A059', fontSize: '1.5rem', fontWeight: 700
                  }}>
                    +{thumbs.length - 4}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
          }}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none',
              color: 'white', fontSize: '32px', cursor: 'pointer', zIndex: 10
            }}
          >✕</button>

          {/* Counter */}
          <div style={{
            position: 'absolute', top: '24px', left: '50%', transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.7)', fontSize: '14px', letterSpacing: '0.1em'
          }}>
            {lightboxIdx + 1} / {images.length}
          </div>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              style={{
                position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '48px', height: '48px',
                borderRadius: '50%', cursor: 'pointer', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.3s'
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(197,160,89,0.5)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            >‹</button>
          )}

          {/* Image */}
          <img
            src={images[lightboxIdx]}
            alt={`Photo ${lightboxIdx + 1}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxHeight: '80vh', maxWidth: '85vw', objectFit: 'contain',
              borderRadius: '8px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
            }}
          />

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext() }}
              style={{
                position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '48px', height: '48px',
                borderRadius: '50%', cursor: 'pointer', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.3s'
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(197,160,89,0.5)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            >›</button>
          )}

          {/* Bottom thumbnails strip */}
          <div style={{
            display: 'flex', gap: '8px', marginTop: '20px', overflowX: 'auto', maxWidth: '85vw', padding: '4px'
          }}>
            {images.map((u, i) => (
              <img
                key={i}
                src={u}
                alt={`thumb-${i}`}
                onClick={(e) => { e.stopPropagation(); setLightboxIdx(i) }}
                style={{
                  width: '64px', height: '48px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer',
                  border: i === lightboxIdx ? '2px solid #C5A059' : '2px solid transparent',
                  opacity: i === lightboxIdx ? 1 : 0.5, transition: 'all 0.3s'
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
