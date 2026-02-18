"use client"
import React, { useEffect, useState, useMemo } from 'react'
import styles from './AdminDashboard.module.css'

type Property = {
  id: string
  title: string
  location: string
  price: string
  type: string
  sqm: number
  rooms: number
  baths: number
  image: string
  images?: string[]
}

type FormState = {
  title: string
  location: string
  price: string
  type: string
  sqm: string
  rooms: string
  baths: string
  image: string
  images?: string[]
  description?: string
}

const emptyProperty: FormState = {
  title: '',
  location: '',
  price: '',
  type: 'sale',
  sqm: '',
  rooms: '',
  baths: '',
  image: '',
  images: []
}

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const locale = 'fr'
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyProperty)
  const [file, setFile] = useState<File | null>(null)
  const [fileList, setFileList] = useState<File[]>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null)

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'sale' | 'rent'>('all')

  // Password reset state
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' })
  const [pwError, setPwError] = useState<string | null>(null)
  const [pwSuccess, setPwSuccess] = useState(false)

  async function fetchProperties() {
    setLoading(true)
    const res = await fetch('/api/admin/properties')
    if (res.ok) {
      const data = await res.json()
      setProperties(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  // Filtered properties
  const filteredProperties = useMemo(() => {
    let result = properties
    if (filterType !== 'all') {
      result = result.filter(p => p.type === filterType)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(p =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.location || '').toLowerCase().includes(q) ||
        String(p.price || '').toLowerCase().includes(q) ||
        String(p.rooms || '').includes(q) ||
        String(p.sqm || '').includes(q)
      )
    }
    return result
  }, [properties, searchQuery, filterType])

  function openCreate() {
    setEditingId(null)
    setForm(emptyProperty)
    setFile(null)
    setPreviewUrl(null)
    setShowModal(true)
  }

  function openEdit(p: Property) {
    setEditingId(p.id)
    setForm({ title: p.title, location: p.location, price: p.price, type: p.type, sqm: String(p.sqm || ''), rooms: String(p.rooms || ''), baths: String(p.baths || ''), image: p.image, images: (p as any).images || [], description: (p as any).description || '' })
    setFileList([])
    setPreviewUrl(((p as any).images && (p as any).images[0]) || p.image || null)
    setShowModal(true)
  }

  function removeImageAt(index: number) {
    setForm(prev => {
      const next = { ...prev }
      next.images = (next.images || []).slice()
      next.images.splice(index, 1)
      return next
    })
    // update preview
    setPreviewUrl((form.images && form.images[0]) || null)
  }

  function moveImage(index: number, dir: -1 | 1) {
    setForm(prev => {
      const list = (prev.images || []).slice()
      const ni = index + dir
      if (ni < 0 || ni >= list.length) return prev
      const tmp = list[ni]
      list[ni] = list[index]
      list[index] = tmp
      return { ...prev, images: list }
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Upload any newly selected files and collect URLs
    let imageUrl = form.image || ''
    const newImageUrls: string[] = []
    if (fileList && fileList.length) {
      for (const f of fileList) {
        const fd = new FormData()
        fd.append('file', f)
        const up = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (up.ok) {
          const json = await up.json()
          newImageUrls.push(json.url)
        }
      }
    }
    if (editingId) {
      // Update
      const imagesPayload = [...(form.images || [])]
      if (newImageUrls.length) imagesPayload.push(...newImageUrls)
      const payload = { ...form, image: imageUrl || (imagesPayload[0] || ''), images: imagesPayload, sqm: Number(form.sqm) || 0, rooms: Number(form.rooms) || 0, baths: Number(form.baths) || 0, description: form.description || '' }
      const res = await fetch(`/api/admin/properties/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        const updated = await res.json()
        setProperties(prev => prev.map(p => p.id === editingId ? updated : p))
      }
    } else {
      // Create
      const imagesPayload = [...(form.images || [])]
      if (newImageUrls.length) imagesPayload.push(...newImageUrls)
      const payload = { ...form, image: imageUrl || (imagesPayload[0] || ''), images: imagesPayload, sqm: Number(form.sqm) || 0, rooms: Number(form.rooms) || 0, baths: Number(form.baths) || 0, description: form.description || '' }
      const res = await fetch('/api/admin/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        const created = await res.json()
        setProperties(prev => [created, ...prev])
      }
    }
    setShowModal(false)
    setFile(null)
    setPreviewUrl(null)
    setFileList([])
  }

  async function handleDelete(id: string) {
    setSelectedDeleteId(id)
    setShowDeleteModal(true)
  }

  async function confirmDelete() {
    if (!selectedDeleteId) return
    const res = await fetch(`/api/admin/properties/${selectedDeleteId}`, { method: 'DELETE' })
    if (res.ok) {
      setProperties(prev => prev.filter(p => p.id !== selectedDeleteId))
    }
    setShowDeleteModal(false)
    setSelectedDeleteId(null)
  }

  // allow removing uploaded files before submit
  function removeSelectedFile(i: number) {
    setFileList(prev => {
      const next = prev.slice()
      next.splice(i, 1)
      if (next.length === 0) setPreviewUrl(null)
      else setPreviewUrl(URL.createObjectURL(next[0]))
      return next
    })
  }

  // Password reset handler
  async function handlePasswordReset(e: React.FormEvent) {
    e.preventDefault()
    setPwError(null)
    setPwSuccess(false)
    if (pwForm.newPw !== pwForm.confirm) {
      setPwError('Les nouveaux mots de passe ne correspondent pas.')
      return
    }
    if (pwForm.newPw.length < 6) {
      setPwError('Le nouveau mot de passe doit contenir au moins 6 caractères.')
      return
    }
    const res = await fetch('/api/admin/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.newPw })
    })
    if (res.ok) {
      setPwSuccess(true)
      setPwForm({ current: '', newPw: '', confirm: '' })
      setTimeout(() => { setShowPasswordModal(false); setPwSuccess(false) }, 2000)
    } else {
      const data = await res.json().catch(() => ({}))
      setPwError(data.error || 'Erreur lors du changement de mot de passe.')
    }
  }

  const saleCount = properties.filter(p => p.type === 'sale').length
  const rentCount = properties.filter(p => p.type === 'rent').length

  function formatPrice(price: any, type: string) {
    if (!price) return '—'
    // if price already contains 'CHF' or non-digit characters, return as-is
    if (typeof price === 'string' && /[A-Za-z€$CHF]/.test(price)) return price
    const num = Number(String(price).replace(/[^0-9.-]+/g, ''))
    if (Number.isNaN(num)) return String(price)
    const formatted = num.toLocaleString('en-US')
    if (type === 'rent') return `${formatted} CHF / mois`
    return `${formatted} CHF`
  }

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1>Gestion des annonces</h1>
            <p>Ajoutez, modifiez ou supprimez vos biens immobiliers</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.btnPrimary} onClick={openCreate}>
              <span>+</span> Nouvelle annonce
            </button>
            <button className={styles.btnSecondary} onClick={() => { setShowPasswordModal(true); setPwError(null); setPwSuccess(false); setPwForm({ current: '', newPw: '', confirm: '' }) }}>
              🔒 Mot de passe
            </button>
            <button className={styles.btnSecondary} onClick={onLogout}>
              Se déconnecter
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <h3>{properties.length}</h3>
            <p>Total annonces</p>
          </div>
          <div className={styles.statCard}>
            <h3>{saleCount}</h3>
            <p>À vendre</p>
          </div>
          <div className={styles.statCard}>
            <h3>{rentCount}</h3>
            <p>À louer</p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div style={{
          display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center'
        }}>
          {/* Search Input */}
          <div style={{ position: 'relative', flex: '1 1 300px', minWidth: '220px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Rechercher par titre, lieu, prix, pièces…"
              style={{
                width: '100%', padding: '12px 16px 12px 44px', borderRadius: '12px',
                background: 'rgba(10, 42, 67, 0.6)', border: '1px solid rgba(197, 160, 89, 0.15)',
                color: '#fff', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s',
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.5)'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.15)'}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.1)', border: 'none', color: 'rgba(255,255,255,0.6)',
                  width: '22px', height: '22px', borderRadius: '50%', cursor: 'pointer', fontSize: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >✕</button>
            )}
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '6px', background: 'rgba(10, 42, 67, 0.6)', borderRadius: '12px', padding: '4px', border: '1px solid rgba(197, 160, 89, 0.1)' }}>
            {([['all', 'Tous'], ['sale', 'Vente'], ['rent', 'Location']] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setFilterType(val)}
                style={{
                  padding: '8px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.02em', transition: 'all 0.2s',
                  background: filterType === val ? 'rgba(197, 160, 89, 0.2)' : 'transparent',
                  color: filterType === val ? '#C5A059' : 'rgba(255,255,255,0.5)',
                  borderBottom: filterType === val ? '2px solid #C5A059' : '2px solid transparent',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Result count */}
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
            {filteredProperties.length} résultat{filteredProperties.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Properties Grid */}
        <h2 className={styles.sectionTitle}>
          {searchQuery ? `Résultats pour « ${searchQuery} »` : 'Toutes les annonces'}
        </h2>
        {loading ? (
          <p style={{ color: 'rgba(255,255,255,0.6)' }}>Chargement...</p>
        ) : filteredProperties.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            background: 'rgba(10, 42, 67, 0.3)', borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', margin: '0 0 8px' }}>
              {searchQuery ? '🔍 Aucune annonce trouvée' : 'Aucune annonce'}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', margin: 0 }}>
              {searchQuery ? 'Essayez avec d\'autres mots-clés' : 'Créez votre première annonce'}
            </p>
          </div>
        ) : (
          <div className={styles.propertiesGrid}>
            {filteredProperties.map(p => (
              <div key={p.id} className={styles.propertyCard}>
                <img src={((p as any).images && (p as any).images.length ? (p as any).images[0] : p.image) || '/images/placeholder.png'} alt={p.title} className={styles.propertyImage} />
                <div className={styles.propertyContent}>
                  <span className={`${styles.typeBadge} ${p.type === 'sale' ? styles.typeSale : styles.typeRent}`}>
                    {p.type === 'sale' ? 'Vente' : 'Location'}
                  </span>
                  <h3 className={styles.propertyTitle}>{p.title || '(Sans titre)'}</h3>
                  <p className={styles.propertyLocation}>{p.location || '—'}</p>
                  <p className={styles.propertyPrice}>{formatPrice(p.price, p.type)}</p>
                  <div className={styles.propertyMeta}>
                    <span className={styles.metaItem}>{p.sqm} m²</span>
                    <span className={styles.metaItem}>{p.rooms} pièces</span>
                    <span className={styles.metaItem}>{p.baths} SdB</span>
                  </div>
                  <div className={styles.propertyActions}>
                    <a className={styles.btnEdit} href={`/${locale}/properties/${p.id}?from=admin`}>Voir</a>
                    <button className={styles.btnEdit} onClick={() => openEdit(p)}>Modifier</button>
                    <button className={styles.btnDelete} onClick={() => handleDelete(p.id)}>×</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>{editingId ? 'Modifier l\'annonce' : 'Nouvelle annonce'}</h2>
                <button className={styles.btnClose} onClick={() => setShowModal(false)}>×</button>
              </div>
              <form className={styles.modalBody} onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label>Titre</label>
                    <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Villa Emerald - Lac Léman" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Localisation</label>
                    <input type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Cologny, Genève" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Prix</label>
                    <input type="text" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="14,500,000 CHF" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Type</label>
                    <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                      <option value="sale">Vente</option>
                      <option value="rent">Location</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Surface (m²)</label>
                    <input type="number" value={form.sqm} onChange={e => setForm({ ...form, sqm: e.target.value })} placeholder="" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Pièces</label>
                    <input type="number" step="0.5" value={form.rooms} onChange={e => setForm({ ...form, rooms: e.target.value })} placeholder="ex: 3.5" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Salles de bain</label>
                    <input type="number" value={form.baths} onChange={e => setForm({ ...form, baths: e.target.value })} placeholder="" />
                  </div>
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label>Image (upload depuis votre PC)</label>
                    <input type="file" accept="image/*" multiple onChange={e => {
                      const files = e.target.files ? Array.from(e.target.files) : []
                      setFileList(prev => prev.concat(files))
                      if (files.length && !previewUrl) setPreviewUrl(URL.createObjectURL(files[0]))
                    }} />
                    {previewUrl && <img src={previewUrl} alt="Aperçu" className={styles.imagePreview} />}
                    {fileList && fileList.length > 0 && (
                      <div className={styles.selectedFiles}>
                        {fileList.map((f, i) => (
                          <div key={i} className={styles.selectedFileItem}>
                            <img src={URL.createObjectURL(f)} className={styles.smallThumb} alt={`sel-${i}`} />
                            <button type="button" onClick={() => removeSelectedFile(i)} className={styles.thumbBtnDelete}>✕</button>
                          </div>
                        ))}
                      </div>
                    )}
                    {form.images && form.images.length > 0 && (
                      <div className={styles.existingImages}>
                        {form.images.map((u, i) => (
                          <div key={i} className={styles.thumbWrap}>
                            <img src={u} alt={`image-${i}`} className={styles.smallThumb} />
                            <div className={styles.thumbActions}>
                              <button type="button" className={styles.thumbBtn} onClick={() => moveImage(i, -1)} aria-label="Move left">◀</button>
                              <button type="button" className={styles.thumbBtn} onClick={() => moveImage(i, 1)} aria-label="Move right">▶</button>
                              <button type="button" className={styles.thumbBtnDelete} onClick={() => removeImageAt(i)} aria-label="Remove">✕</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label>Description</label>
                    <textarea value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description complète de l'annonce..." rows={5} />
                  </div>
                </div>
                <div className={styles.modalActions}>
                  <button type="button" className={styles.btnSecondary} onClick={() => setShowModal(false)}>Annuler</button>
                  <button type="submit" className={styles.btnPrimary}>{editingId ? 'Enregistrer' : 'Créer'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className={styles.modalOverlay} onClick={() => setShowDeleteModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Confirmer la suppression</h2>
              <button className={styles.btnClose} onClick={() => setShowDeleteModal(false)}>×</button>
            </div>
            <div className={styles.modalBody}>
              <p>Êtes-vous sûr de vouloir supprimer cette annonce ? Cette action est irréversible.</p>
            </div>
            <div className={styles.modalActions}>
              <button type="button" className={styles.btnSecondary} onClick={() => setShowDeleteModal(false)}>Annuler</button>
              <button type="button" className={styles.btnDelete} onClick={confirmDelete}>Supprimer</button>
            </div>
          </div>
        </div>
      )}

      {/* Password Reset Modal */}
      {showPasswordModal && (
        <div className={styles.modalOverlay} onClick={() => setShowPasswordModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
            <div className={styles.modalHeader}>
              <h2>Changer le mot de passe</h2>
              <button className={styles.btnClose} onClick={() => setShowPasswordModal(false)}>×</button>
            </div>
            <form className={styles.modalBody} onSubmit={handlePasswordReset}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className={styles.formGroup}>
                  <label>Mot de passe actuel</label>
                  <input
                    type="password"
                    value={pwForm.current}
                    onChange={e => setPwForm({ ...pwForm, current: e.target.value })}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Nouveau mot de passe</label>
                  <input
                    type="password"
                    value={pwForm.newPw}
                    onChange={e => setPwForm({ ...pwForm, newPw: e.target.value })}
                    placeholder="Minimum 6 caractères"
                    required
                    minLength={6}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Confirmer le nouveau mot de passe</label>
                  <input
                    type="password"
                    value={pwForm.confirm}
                    onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })}
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>
              {pwError && (
                <p style={{ color: '#ef4444', fontSize: '0.85rem', margin: '12px 0 0', padding: '10px 14px', background: 'rgba(239,68,68,0.08)', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.2)' }}>
                  {pwError}
                </p>
              )}
              {pwSuccess && (
                <p style={{ color: '#22c55e', fontSize: '0.85rem', margin: '12px 0 0', padding: '10px 14px', background: 'rgba(34,197,94,0.08)', borderRadius: '8px', border: '1px solid rgba(34,197,94,0.2)' }}>
                  ✓ Mot de passe modifié avec succès !
                </p>
              )}
              <div className={styles.modalActions}>
                <button type="button" className={styles.btnSecondary} onClick={() => setShowPasswordModal(false)}>Annuler</button>
                <button type="submit" className={styles.btnPrimary}>Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
