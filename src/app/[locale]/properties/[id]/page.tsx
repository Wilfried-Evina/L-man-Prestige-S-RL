import fs from 'fs/promises'
import path from 'path'
import type { Metadata } from 'next'
import Image from 'next/image'
import styles from './PropertyDetail.module.css'
import { getCollection } from '../../../../lib/mongo'
import PropertyGallery from '../../../../components/PropertyGallery'
import ContactModal from '../../../../components/ContactModal'

type Props = { params: Promise<{ locale: string; id: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

function formatPrice(price: any, type: string) {
  if (!price) return '—'
  if (typeof price === 'string' && /[A-Za-z€$CHF]/.test(price)) return price
  const num = Number(String(price).replace(/[^0-9.-]+/g, ''))
  if (Number.isNaN(num)) return String(price)
  const formatted = num.toLocaleString('en-US')
  if (type === 'rent') return `${formatted} CHF / mois`
  return `${formatted} CHF`
}

export default async function Page({ params, searchParams }: Props) {
  const { id, locale } = await params
  const sp = await searchParams
  const fromAdmin = sp.from === 'admin'
  const backHref = fromAdmin ? `/${locale}/admin` : `/${locale}/properties`
  let item: any = null
  if (process.env.MONGO_URI) {
    try {
      const coll = await getCollection('properties')
      item = await coll.findOne({ id: String(id) })
    } catch (e) {
      // fallback to file
    }
  }
  if (!item) {
    const DATA_PATH = path.resolve(process.cwd(), 'src/data/properties.json')
    const raw = await fs.readFile(DATA_PATH, 'utf-8')
    const data = JSON.parse(raw)
    item = data.find((d: any) => String(d.id) === String(id))
  }
  if (!item) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.notFound}>
            <h1 className={styles.notFoundTitle}>Annonce introuvable</h1>
            <p className={styles.notFoundText}>Cette annonce n'existe pas ou a été supprimée.</p>
            <a href={backHref} className={styles.notFoundLink}>← Retour</a>
          </div>
        </div>
      </div>
    )
  }

  const heroImage = (item.images && item.images.length ? item.images[0] : item.image) || '/images/placeholder.png'

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <a href={backHref} className={styles.backLink}>← Retour aux annonces</a>

        {/* Hero — first image only */}
        <section className={styles.heroSection}>
          <div className={styles.heroImage}>
            <Image src={heroImage} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          </div>
          <div className={styles.heroOverlay}>
            <span className={styles.typeBadgeInline}>
              {item.type === 'sale' ? 'Vente' : 'Location'}
            </span>
            <h1 className={styles.heroTitle}>{item.title}</h1>
            <p className={styles.heroLocation}>{item.location}</p>
          </div>
        </section>

        {/* Price banner */}
        <div className={styles.priceBanner}>
          <span className={styles.priceLabel}>Prix</span>
          <span className={styles.priceValue}>{formatPrice(item.price, item.type)}</span>
        </div>

        {/* Details cards */}
        <section className={styles.detailsSection}>
          <div className={styles.detailCard}>
            <p className={styles.detailValue}>{item.sqm} m²</p>
            <p className={styles.detailLabel}>Surface</p>
          </div>
          <div className={styles.detailCard}>
            <p className={styles.detailValue}>{item.rooms}</p>
            <p className={styles.detailLabel}>Pièces</p>
          </div>
          <div className={styles.detailCard}>
            <p className={styles.detailValue}>{item.baths}</p>
            <p className={styles.detailLabel}>Salles de bain</p>
          </div>
          <div className={styles.detailCard}>
            <p className={styles.detailValue}>{item.type === 'sale' ? 'Vente' : 'Location'}</p>
            <p className={styles.detailLabel}>Type</p>
          </div>
        </section>

        {/* Description */}
        <section className={styles.descriptionSection}>
          <h3 className={styles.descriptionTitle}>Description</h3>
          <p className={styles.descriptionText}>{item.description || 'Pas de description disponible pour cette annonce.'}</p>
        </section>

        {/* Gallery — separate section below */}
        {item.images && item.images.length > 0 && (
          <section className={styles.gallerySection}>
            <h3 className={styles.galleryTitle}>Galerie photos</h3>
            <PropertyGallery images={item.images} />
          </section>
        )}

        {/* CTA Contact */}
        <section className={styles.ctaSection}>
          <p className={styles.ctaText}>Intéressé par ce bien ?</p>
          <ContactModal />
        </section>
      </div>
    </main>
  )
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { id, locale } = await params
  let item: any = null
  if (process.env.MONGO_URI) {
    try {
      const coll = await getCollection('properties')
      item = await coll.findOne({ id: String(id) })
    } catch (e) {
      // fallback
    }
  }
  if (!item) {
    const DATA_PATH = path.resolve(process.cwd(), 'src/data/properties.json')
    try {
      const raw = await fs.readFile(DATA_PATH, 'utf-8')
      const data = JSON.parse(raw)
      item = data.find((d: any) => String(d.id) === String(id))
    } catch (e) {
      // ignore
    }
  }

  const title = item ? `${item.title} — Léman Prestige` : 'Annonce — Léman Prestige'
  const description = item && item.description ? item.description.slice(0, 160) : 'Annonce immobilière de prestige sur le Léman.'
  const heroImage = item && (item.images && item.images.length ? item.images[0] : item.image) ? (item.images && item.images.length ? item.images[0] : item.image) : '/images/placeholder.png'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [heroImage],
    },
  }
}
