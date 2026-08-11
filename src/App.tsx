import { useEffect, useState } from 'react'

/** Works on localhost + GitHub Pages base path */
const img = (file: string) =>
  `${import.meta.env.BASE_URL}images/${file.replace(/^\/?images\//, '')}`

/**
 * Formspree endpoint. The form id is public by design — it ships inside the
 * page HTML — so it lives here rather than in an env var.
 */
const FORMSPREE_ID = 'mnpadgpo'
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`

const requestTypes = [
  'Deschidere restaurant nou',
  'Optimizare restaurant existent',
  'Food cost management & control',
  'Tehnici de lucru / training personal',
  'Food design & plating',
  'Igienă & siguranța alimentației',
  'Altceva',
]

const nav = [
  { href: '#despre', label: 'Despre' },
  { href: '#servicii', label: 'Servicii' },
  { href: '#proces', label: 'Cum lucrez' },
  { href: '#experienta', label: 'Experiență' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#contact', label: 'Contact' },
]

/** Tiberiu's own working method, in his words. */
const process = [
  {
    step: 'Vizită',
    text: 'Vin în unitate, văd bucătăria la lucru, gust preparatele și urmăresc serviciul într-o zi normală — nu una pregătită.',
  },
  {
    step: 'Evaluare',
    text: 'Măsor ce se poate măsura: food cost, fișe tehnice, flux de lucru, echipamente, posturi, timpi de ieșire la pas.',
  },
  {
    step: 'Diagnostic',
    text: 'Spun clar unde pierzi bani și de ce. Fără menajamente, dar cu explicație — patronul trebuie să înțeleagă cauza, nu doar simptomul.',
  },
  {
    step: 'Rezolvare',
    text: 'Lucrez cot la cot cu echipa: meniu refăcut, standarde scrise, personal instruit. Rămân pe follow-up până se așază.',
  },
]

const competitions = [
  { title: 'Best Chef IPA — locul 2', detail: 'Ediția a II-a, alături de Chef Erni Schmidt' },
  { title: 'Vándorcsizma — membru în juriu', detail: 'Concurs de gulaș, festival de dansuri populare' },
  { title: 'UniChef Cup', detail: 'Unilever Food Solutions — jurizare și demonstrații' },
  { title: 'Taste Forward 2025', detail: 'București — prezență profesională' },
]

const stats = [
  { value: '25+', label: 'Ani în bucătărie' },
  { value: '3', label: 'Țări · RO · DE · BE' },
  { value: '#2', label: 'Best Chef IPA' },
  { value: '5000', label: 'Persoane · eveniment BE' },
]

/**
 * Ofertă oficială din materialul de prezentare:
 * „Ofer consultanță gastronomică completă” — exact cele 7 puncte.
 */
const services = [
  {
    title: 'Deschiderea unui restaurant nou',
    text: 'Consultanță completă pentru opening: concept, flux bucătărie, echipamente și standarde de producție.',
  },
  {
    title: 'Îmbunătățirea și optimizarea unui restaurant existent',
    text: 'Optimizare meniu, organizare, eficiență pe flux și rezultate mai bune pe operațiunea curentă.',
  },
  {
    title: 'Food cost management & control',
    text: 'Control food cost, rețete standardizate, inventar și profitabilitate pe farfurie.',
  },
  {
    title: 'Tehnici corecte de lucru în bucătărie',
    text: 'Tehnici profesionale de lucru, standarde pe posturi și transfer de meserie în brigadă.',
  },
  {
    title: 'Instruirea și motivarea personalului',
    text: 'Instruire echipă, motivare, leadership de brigadă și ritm de serviciu.',
  },
  {
    title: 'Food design & plating de nivel înalt',
    text: 'Food design și plating de nivel înalt — prezentare, amprentă de chef, farfurie de top.',
  },
  {
    title: 'Consultanță igienă & siguranța alimentației publice',
    text: 'Consultanță pe igienă și siguranța alimentației publice în unitatea de alimentație.',
  },
]

/** Galerie mixtă: preparate + chef / evenimente */
const gallery = [
  // — Mâncare —
  { src: img('food-creveti.jpg'), alt: 'Fine dining — creveți și mousse' },
  { src: img('food-canape.jpg'), alt: 'Canape premium pentru eveniment' },
  { src: img('food-platter-mezeluri.jpg'), alt: 'Platter tradițional mezeluri și brânzeturi' },
  { src: img('food-desert-pahar.jpg'), alt: 'Desert în pahar cu fructe' },
  { src: img('food-salata-moderna.jpg'), alt: 'Salată modernă cu brânză și măsline' },
  { src: img('food-burger.jpg'), alt: 'Burger gourmet cu ou și cartofi' },
  { src: img('food-ceaun.jpg'), alt: 'Preparat la ceaun — eveniment outdoor' },
  { src: img('food-tocanita.jpg'), alt: 'Tocăniță la ceaun cu pătrunjel' },
  { src: img('food-canape-slate.jpg'), alt: 'Canape pe ardezie — wrap și prosciutto' },
  { src: img('food-ardei-umpluti.jpg'), alt: 'Ardei umpluți pe farfurie ceramică' },
  { src: img('food-cheesecake.jpg'), alt: 'Cheesecake plating profesional' },
  { src: img('food-branzeturi.jpg'), alt: 'Platter brânzeturi premium' },
  { src: img('food-tarta-mere.jpg'), alt: 'Tartă cu mere și migdale' },
  { src: img('food-rulada-prune.jpg'), alt: 'Ruladă cu prune uscate — producție' },
  { src: img('food-sandwich.jpg'), alt: 'Sandwich gourmet UniChef' },
  { src: img('food-burger-premium.jpg'), alt: 'Burger premium cu cartofi wedges' },
  // — Chef / evenimente (deja pe site) —
  { src: img('mussels.jpg'), alt: 'Show cooking midii la eveniment' },
  { src: img('roast-slice.jpg'), alt: 'Tranșare preparat premium' },
  { src: img('spit-roast.jpg'), alt: 'Miel la proțap' },
  { src: img('platters.jpg'), alt: 'Platouri pentru eveniment' },
  { src: img('duo-fire.jpg'), alt: 'Alături de Chef Erni Schmidt' },
  { src: img('kitchen-team.jpg'), alt: 'Training în bucătărie profesională' },
  { src: img('medals.jpg'), alt: 'Echipă cu medalii la concurs' },
  { src: img('jury-mussels.jpg'), alt: 'Jurizare Best Chef IPA' },
  { src: img('unichef-booth.jpg'), alt: 'UniChef · Unilever Food Solutions' },
  { src: img('taste-forward.jpg'), alt: 'Taste Forward 2025 București' },
]

const mediaLinks = [
  {
    title: 'Medieșeanul Tiberiu Csiszer, șeful „chef“-ilor',
    source: 'Monitorul de Mediaș',
    href: 'https://www.monitoruldemedias.ro/2014/02/medieseanul-tiberiu-csiszer-seful-chef.html',
  },
  {
    title: 'Deliciu de post á la Chef Tiberiu Csiszer',
    source: 'Strada Cetății',
    href: 'https://stradacetatii.ro/2022/03/deliciu-de-post-a-la-chef-tiberiu-csiszer/',
  },
  {
    title: 'Creativitate și pasiune înnăscută pentru gastronomie',
    source: 'Complimente Bucătarului',
    href: 'https://complimentebucatarului.ro/tiberiu-csiszer/',
  },
  {
    title: 'Somon cu măr și spanac — rețetă video',
    source: 'YouTube',
    href: 'https://www.youtube.com/watch?v=f58jVwtkzNo',
  },
]

type IconName = 'phone' | 'whatsapp' | 'mail' | 'instagram' | 'linkedin' | 'pin'

/** Inline contact icons — stroke style, inherit currentColor. */
function Icon({ name, className = 'h-4 w-4' }: { name: IconName; className?: string }) {
  const stroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  } as const

  switch (name) {
    case 'phone':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.9z" />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      )
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 6L2 7" />
        </svg>
      )
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
        </svg>
      )
    case 'pin':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
  }
}

/**
 * Two transparent PNGs — white art for dark surfaces, near-black for light.
 * CSS picks one, so no blend modes and no white plate behind the mark.
 */
function Logo({ className = '', onDark = false }: { className?: string; onDark?: boolean }) {
  // onDark: surface is dark regardless of theme (e.g. nav over the hero plate).
  if (onDark) {
    return (
      <img
        src={img('brand/logo-light.png')}
        alt="Chef Tiberiu Csiszer"
        className={`select-none ${className}`}
      />
    )
  }
  return (
    <>
      <img
        src={img('brand/logo-light.png')}
        alt="Chef Tiberiu Csiszer"
        className={`logo-for-dark select-none ${className}`}
      />
      <img
        src={img('brand/logo-dark.png')}
        alt=""
        aria-hidden
        className={`logo-for-light select-none ${className}`}
      />
    </>
  )
}

type Theme = 'dark' | 'light'

function ThemeToggle({ onDark }: { onDark: boolean }) {
  const [theme, setTheme] = useState<Theme>(
    () => (document.documentElement.dataset.theme as Theme) || 'dark',
  )

  // Two instances render (desktop + mobile nav), so the <html> attribute is
  // the single source of truth — each click reads it fresh.
  function toggle() {
    const current = (document.documentElement.dataset.theme as Theme) || 'dark'
    const next: Theme = current === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    localStorage.setItem('theme', next)
    setTheme(next)
  }

  const next: Theme = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={next === 'light' ? 'Comută pe tema deschisă' : 'Comută pe tema închisă'}
      className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
        onDark
          ? 'border-white/25 text-white/80 hover:border-gold hover:text-gold'
          : 'border-border text-muted hover:border-gold hover:text-gold'
      }`}
    >
      {theme === 'dark' ? (
        /* sun */
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        /* moon */
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Over the fixed-dark hero plate the nav is white; scrolled it follows theme.
  const onHero = !scrolled && !open
  const linkCls = onHero
    ? 'text-white/85 hover:text-white'
    : 'text-muted hover:text-gold'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-border/50 bg-bg/90 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center" aria-label="Chef Tiberiu Csiszer — start">
          <Logo className="h-12 w-auto md:h-14" onDark={onHero} />
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-xs font-medium tracking-[0.18em] uppercase transition ${linkCls}`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://wa.me/40741591252"
            target="_blank"
            rel="noreferrer"
            className="bg-gold-gradient rounded-full px-4 py-2 text-xs font-semibold tracking-wide text-black uppercase"
          >
            WhatsApp
          </a>
          <ThemeToggle onDark={onHero} />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle onDark={onHero} />
        <button
          type="button"
          className={onHero ? 'text-white' : 'text-fg'}
          aria-label="Meniu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
        </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-bg/95 px-5 py-4 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm tracking-wide text-muted uppercase"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://wa.me/40741591252"
              target="_blank"
              rel="noreferrer"
              className="text-gold"
              onClick={() => setOpen(false)}
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        // 0 at top → 1 after ~0.7 viewport (clear, visible zoom)
        const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.7)))
        setScrollProgress(p)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Visible Ken-Burns: scale 1 → 1.18
  const imgScale = 1 + scrollProgress * 0.18
  const imgY = scrollProgress * 36
  const contentOpacity = 1 - scrollProgress * 0.4
  const contentY = scrollProgress * 32

  return (
    <section
      id="top"
      className="hero-plate relative flex min-h-svh items-center overflow-hidden pb-16 pt-24 max-lg:min-h-0 max-lg:items-start max-lg:pt-20 max-lg:pb-24 md:pb-20 lg:items-start lg:pt-44"
    >
      {/* Studio backdrop: grey spotlight behind the figure, vignette edges */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="hero-spot absolute inset-0" />
        <div className="hero-vignette absolute inset-0" />
      </div>

      {/*
        Tibi cutout on the right — same black as site bg so only he reads.
        Mobile: half peeks from right. Desktop: full figure.
        Scroll: clear scale-up.
      */}
      <div
        className="hero-frame pointer-events-none absolute inset-y-0 right-0 z-[1] overflow-hidden max-lg:w-full lg:w-[58%]"
        aria-hidden
      >
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translate3d(0, ${imgY}px, 0) scale(${imgScale})`,
            transformOrigin: '70% 95%',
          }}
        >
          <picture>
            <source srcSet={img('tibi-hero.webp')} type="image/webp" />
            <img
              src={img('tibi-hero.png')}
              alt="Chef Tiberiu Csiszer"
              width={880}
              height={999}
              fetchPriority="high"
              decoding="async"
              className={[
                'absolute w-auto max-w-none select-none object-contain',
                /* Phone: anchor to the TOP so the head sits in the free
                   top-right corner beside the name; the body runs down
                   behind the copy and dissolves through the masks. */
                'max-lg:top-24 max-lg:right-[-14%] max-lg:h-[46svh] max-lg:object-top',
                /* Desktop: full figure standing on the section bottom */
                /* min() caps portrait screens (iPad Pro): height would blow
                   past the container width and show a zoomed sliver */
                'lg:bottom-0 lg:object-bottom lg:right-[14%] lg:h-[min(97svh,68vw)]',
              ].join(' ')}
            />
          </picture>
        </div>
      </div>

      {/* Mobile-first left veil for copy legibility, then fade into theme bg */}
      <div className="hero-veil-left pointer-events-none absolute inset-0 z-[2]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-28 bg-gradient-to-t from-bg to-transparent md:h-40" aria-hidden />

      <div
        className="relative z-[3] mx-auto w-full max-w-7xl px-6 will-change-transform lg:px-10"
        style={{
          opacity: contentOpacity,
          transform: `translate3d(0, ${contentY}px, 0)`,
        }}
      >
        <p className="mb-5 inline-flex items-center gap-2 text-xs font-medium tracking-[0.28em] text-gold uppercase">
          <span className="inline-block h-px w-8 bg-gold" />
          Executive Chef · Consultant Culinar
        </p>

        <h1 className="font-display text-[clamp(3rem,8.5vw,7.5rem)] leading-[0.92] tracking-wide text-white">
          TIBERIU
          <br />
          <span className="hero-name-gold">CSISZER</span>
        </h1>

        <div className="max-w-md md:max-w-lg">
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
            Restaurantul tău pierde bani pe meniu? 25 de ani de bucătărie internațională — Mediaș,
            Germania, Belgia — puși în serviciul afacerii tale.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="https://wa.me/40741591252"
              target="_blank"
              rel="noreferrer"
              className="bg-gold-gradient rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide text-[#1b1d1e] shadow-[0_8px_30px_rgba(201,122,61,0.3)] transition hover:brightness-110"
            >
              Rezervă o discuție
            </a>
            <a
              href="#servicii"
              className="rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm text-white backdrop-blur-sm transition hover:border-gold hover:text-gold"
            >
              Vezi serviciile
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
            <a href="tel:+40741591252" className="transition hover:text-gold">
              0741 591 252
            </a>
            <span className="hidden text-white/25 sm:inline">|</span>
            <a
              href="https://www.instagram.com/cheftiberiucsiszer/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-gold"
            >
              @cheftiberiucsiszer
            </a>
            <span className="hidden text-white/25 sm:inline">|</span>
            <span>Mediaș, România</span>
          </div>

          {/* Motto-ul lui Tibi */}
          <figure className="mt-10 max-w-md border-l-2 border-gold/60 pl-4">
            <blockquote className="text-base leading-relaxed text-white/85 italic md:text-lg">
              "When you pray for rain, you gotta deal with the mud too."
            </blockquote>
          </figure>
        </div>
      </div>

      <a
        href="#despre"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-white/45 uppercase transition hover:text-gold max-lg:hidden"
        style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}
        aria-label="Scroll"
      >
        <span>Scroll</span>
        <span className="block h-8 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
      </a>
    </section>
  )
}

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/40741591252?text=Bun%C4%83%20Chef%20Tiberiu!%20A%C8%99%20dori%20o%20colaborare."
      target="_blank"
      rel="noreferrer"
      className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition hover:scale-105"
      aria-label="WhatsApp"
      title="WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  )
}

function Proof() {
  return (
    <section className="border-y border-border bg-bg-elevated py-10">
      <div className="mx-auto max-w-6xl px-5">
        <p className="mb-6 text-center text-xs tracking-[0.2em] text-muted uppercase">
          Au scris despre el
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-muted md:text-base">
          <span className="font-medium text-fg/80">Monitorul de Mediaș</span>
          <span className="text-gold/40">·</span>
          <span className="font-medium text-fg/80">Strada Cetății</span>
          <span className="text-gold/40">·</span>
          <span className="font-medium text-fg/80">Complimente Bucătarului</span>
          <span className="text-gold/40">·</span>
          <span className="font-medium text-fg/80">UniChef / Unilever</span>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card-premium rounded-2xl p-6 text-center">
            <p className="font-display text-4xl text-gold-gradient md:text-5xl">{s.value}</p>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="despre" className="py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-3">
          <img
            src={img('hero.jpg')}
            alt="Chef Tiberiu Csiszer"
            className="row-span-2 h-full min-h-[320px] rounded-2xl object-cover object-top"
          />
          <img
            src={img('portrait-smile.jpg')}
            alt="Portret Chef Tiberiu"
            className="h-40 rounded-2xl object-cover sm:h-48"
          />
          <img
            src={img('roast-slice.jpg')}
            alt="Preparat semnat"
            className="h-40 rounded-2xl object-cover sm:h-48"
          />
        </div>
        <div>
          <p className="text-xs tracking-[0.25em] text-gold uppercase">Cine este</p>
          <h2 className="font-display mt-3 text-4xl tracking-wide md:text-5xl">
            CHEF TIBERIU CSISZER
          </h2>
          <div className="section-line mt-4 h-px w-24" />
          <div className="mt-6 space-y-4 text-muted leading-relaxed">
            <p>
              Povestea începe aproape de sonde: absolvent instalator-sudor, gata de Romgaz — apoi
              schimbă salopeta pe șorț. În 2000 învață meserie la Sibiu, de la maestrul „nea Liviu”,
              apoi preia bucătăria unui restaurant din centru.
            </p>
            <p>
              Salturi în carieră la Bazna și Binderbubi (4★ Mediaș), apoi Düsseldorf la restaurantul
              Gourmet: nunți de 400 de persoane, somon norvegian, vită din Argentina, sezonalitate
              reală sub un șef cu stea Michelin.
            </p>
            <p>
              Show cooking pe croazieră pe Dunăre. Curs și lucru în Belgia — alături de 50 de
              bucătari, pentru 5.000 de invitați. Întors acasă: consultanță, training, evenimente,
              colaborări (inclusiv cu Chef Erni Schmidt) și locul 2 la Best Chef IPA.
            </p>
            <p className="border-l-2 border-gold pl-4 text-fg/90 italic">
              „Pentru mine, bucătăria e o provocare. Ideea mea e să simplific meniurile. Bucătăria e
              un tărâm cu reguli fixe, dar și cu posibilitatea de a crea.”
            </p>
            <p className="text-fg/90">
              <span className="font-medium text-gold">Ce înseamnă asta pentru restaurantul tău:</span>{' '}
              douăzeci și cinci de ani de greșeli făcute și reparate în bucătării adevărate — de la
              hotel de patru stele la evenimente de 5.000 de persoane. Nu vin cu teorie de curs, vin
              cu ce am văzut că ține la pas, în serviciu real, cu personalul pe care îl ai.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  const items = [
    {
      title: 'Germania · Düsseldorf',
      text: 'Restaurant Gourmet — evenimente și nunți la scară mare, standarde profesionale, piață zilnică, meniu de sezon.',
    },
    {
      title: 'Belgia · Catering',
      text: 'Perfecționare catering. Gătit în echipă de 50 pentru un eveniment cu 5.000 de persoane.',
    },
    {
      title: 'Croazieră Dunăre',
      text: 'Show cooking live pentru clienți internaționali — specific local adaptat pe țară, inclusiv rețete românești.',
    },
    {
      title: 'România · Mediaș & Transilvania',
      text: 'Hotel 4★, consultanță openings, meniuri, evenimente, jurizare concursuri, parteneriate UniChef / Knorr.',
    },
  ]

  return (
    <section id="experienta" className="bg-bg-elevated py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs tracking-[0.25em] text-gold uppercase">Traseu</p>
        <h2 className="font-display mt-3 text-4xl tracking-wide md:text-5xl">EXPERIENȚĂ</h2>
        <div className="section-line mt-4 h-px w-24" />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.title} className="card-premium rounded-2xl p-6">
              <h3 className="font-display text-xl tracking-wide text-gold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="card-premium mt-10 grid items-center gap-8 overflow-hidden rounded-3xl md:grid-cols-2">
          <img
            src={img('best-chef-ipa.jpg')}
            alt="Best Chef IPA — Chef Tiberiu Csiszer"
            className="h-full min-h-[260px] w-full object-cover"
          />
          <div className="p-6 md:p-8">
            <p className="text-xs tracking-[0.2em] text-gold uppercase">Semnătură & concursuri</p>
            <h3 className="font-display mt-2 text-3xl tracking-wide">
              Somon cu măr, spanac & sos de struguri
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Preparat gândit când județul Sibiu a fost Regiune Gastronomică Europeană (2019).
              Struguri de pe emblema Mediașului — Vechea Metropolă de Vin. Meniuri scurte, puține
              preparate, top. Influențe maghiare și săsești. Model: Gordon Ramsay · urmărește
              scenele din RO (Robert Voicu).
            </p>
            <p className="mt-4 text-sm text-muted">
              Best Chef IPA (cu Chef Erni Schmidt) · jurizare · Taste Forward / UniChef Cup.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="servicii" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs tracking-[0.25em] text-gold uppercase">Ce ofer</p>
        <h2 className="font-display mt-3 text-4xl tracking-wide md:text-5xl">
          CONSULTANȚĂ GASTRONOMICĂ
        </h2>
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">
          Ofer consultanță gastronomică completă — de la deschiderea unui restaurant nou până la
          plating de nivel înalt, food cost și siguranța alimentației publice.
        </p>
        <div className="section-line mt-4 h-px w-24" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <article key={s.title} className="card-premium flex flex-col rounded-2xl p-6 md:p-8">
              <span className="font-display text-3xl text-gold/40">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-xl tracking-wide md:text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
              {/* Preselects this service in the contact form. */}
              <a
                href={`#contact?serviciu=${encodeURIComponent(requestTypes[i] ?? '')}`}
                onClick={(e) => {
                  e.preventDefault()
                  window.dispatchEvent(
                    new CustomEvent('preselect-service', { detail: requestTypes[i] }),
                  )
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="mt-5 inline-flex items-center gap-1.5 self-start text-sm text-gold transition hover:gap-2.5"
              >
                Cere ofertă
                <span aria-hidden>→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="proces" className="bg-bg-elevated py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs tracking-[0.25em] text-gold uppercase">Metoda</p>
        <h2 className="font-display mt-3 text-4xl tracking-wide md:text-5xl">CUM LUCREZ</h2>
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">
          Patru pași, în ordinea asta. Fără sărituri — diagnosticul fără vizită e ghicit, iar
          rezolvarea fără diagnostic e cheltuială.
        </p>
        <div className="section-line mt-4 h-px w-24" />

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <li key={p.step} className="card-premium relative rounded-2xl p-6">
              <span className="font-display text-4xl text-gold/30">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-display text-2xl tracking-wide text-gold">{p.step}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Competitions() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs tracking-[0.25em] text-gold uppercase">Recunoaștere</p>
        <h2 className="font-display mt-3 text-4xl tracking-wide md:text-5xl">
          CONCURSURI & JURIZĂRI
        </h2>
        <div className="section-line mt-4 h-px w-24" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {competitions.map((c) => (
            <article key={c.title} className="card-premium rounded-2xl p-5">
              <h3 className="font-medium text-fg">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section id="galerie" className="bg-bg-elevated py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs tracking-[0.25em] text-gold uppercase">Preparate · evenimente · chef</p>
        <h2 className="font-display mt-3 text-4xl tracking-wide md:text-5xl">GALERIE</h2>
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">
          Mâncare semnată, plating, evenimente și momente din carieră — nu doar portrete.
        </p>
        <div className="section-line mt-4 h-px w-24" />
        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {gallery.map((g) => (
            <figure
              key={g.src}
              className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border"
            >
              <img
                src={g.src}
                alt={g.alt}
                className="w-full object-cover transition duration-500 hover:scale-[1.03]"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Media() {
  return (
    <section id="media" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs tracking-[0.25em] text-gold uppercase">Presă & video</p>
        <h2 className="font-display mt-3 text-4xl tracking-wide md:text-5xl">MEDIA</h2>
        <div className="section-line mt-4 h-px w-24" />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="card-premium overflow-hidden rounded-3xl">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/f58jVwtkzNo"
                title="Somon cu măr și spanac — Chef Tiberiu Csiszer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-5">
              <p className="font-display text-xl tracking-wide">Somon cu măr și spanac</p>
              <p className="mt-1 text-sm text-muted">Rețetă video · Bouquet de Provence / Knorr</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {mediaLinks.map((m) => (
              <a
                key={m.href}
                href={m.href}
                target="_blank"
                rel="noreferrer"
                className="card-premium group rounded-2xl p-5 transition hover:border-gold/40"
              >
                <p className="text-xs tracking-wider text-gold uppercase">{m.source}</p>
                <p className="mt-2 font-medium text-fg group-hover:text-gold-soft">{m.title}</p>
              </a>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <img
                src={img('media-group.jpg')}
                alt="Filmări media"
                className="h-28 rounded-xl object-cover sm:h-32"
              />
              <img
                src={img('taste-forward.jpg')}
                alt="Taste Forward 2025"
                className="h-28 rounded-xl object-cover sm:h-32"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="bg-bg-elevated py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="card-premium grid overflow-hidden rounded-3xl lg:grid-cols-2">
          <div className="p-8 md:p-12">
            <p className="text-xs tracking-[0.25em] text-gold uppercase">Hai să vorbim</p>
            <h2 className="font-display mt-3 text-4xl tracking-wide md:text-5xl">CONTACT</h2>
            <div className="section-line mt-4 h-px w-24" />
            <p className="mt-6 text-muted leading-relaxed">
              Openings, refresh restaurant, training, evenimente sau un sfat de meniu. Răspund
              oricui cere cu seriozitate.
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <p className="flex items-center gap-3">
                <Icon name="phone" className="h-4 w-4 shrink-0 text-muted" />
                <a href="tel:+40741591252" className="text-gold hover:underline">
                  0741 591 252
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Icon name="whatsapp" className="h-4 w-4 shrink-0 text-muted" />
                <a
                  href="https://wa.me/40741591252"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold hover:underline"
                >
                  0741 591 252
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Icon name="mail" className="h-4 w-4 shrink-0 text-muted" />
                <a
                  href="mailto:chef_tiberiu13@yahoo.ro"
                  className="text-gold hover:underline"
                >
                  chef_tiberiu13@yahoo.ro
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Icon name="instagram" className="h-4 w-4 shrink-0 text-muted" />
                <a
                  href="https://www.instagram.com/cheftiberiucsiszer/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold hover:underline"
                >
                  @cheftiberiucsiszer
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Icon name="linkedin" className="h-4 w-4 shrink-0 text-muted" />
                <a
                  href="https://ro.linkedin.com/in/csiszer-tiberiu-49095a36"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold hover:underline"
                >
                  Csiszer Tiberiu
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Icon name="pin" className="h-4 w-4 shrink-0 text-muted" />
                <span className="text-fg">Mediaș, România</span>
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="tel:+40741591252"
                className="bg-gold-gradient inline-flex rounded-full px-6 py-3 text-sm font-semibold text-black"
              >
                Sună acum
              </a>
              <a
                href="https://wa.me/40741591252"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-border px-6 py-3 text-sm text-fg transition hover:border-gold hover:text-gold"
              >
                WhatsApp
              </a>
              <a
                href="mailto:chef_tiberiu13@yahoo.ro"
                className="inline-flex rounded-full border border-border px-6 py-3 text-sm text-fg transition hover:border-gold hover:text-gold"
              >
                Email
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

type FormState = 'idle' | 'sending' | 'sent' | 'error'

function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [error, setError] = useState('')
  const [service, setService] = useState('')

  // "Cere ofertă" on a service card fills the dropdown before the scroll lands.
  useEffect(() => {
    const onPreselect = (e: Event) => {
      setService((e as CustomEvent<string>).detail ?? '')
      setState('idle')
    }
    window.addEventListener('preselect-service', onPreselect)
    return () => window.removeEventListener('preselect-service', onPreselect)
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setState('sending')
    setError('')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })

      if (response.ok) {
        form.reset()
        setState('sent')
        return
      }

      // Formspree returns field-level errors in a JSON body on 4xx.
      const body = await response.json().catch(() => null)
      setError(body?.errors?.[0]?.message ?? 'Trimiterea a eșuat. Încearcă din nou.')
      setState('error')
    } catch {
      setError('Conexiune întreruptă. Verifică internetul și încearcă din nou.')
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div className="flex min-h-[280px] flex-col justify-center border-t border-border p-8 md:p-12 lg:border-t-0 lg:border-l">
        <p className="font-display text-3xl tracking-wide text-gold">MULȚUMESC!</p>
        <p className="mt-4 text-muted leading-relaxed">
          Mesajul a ajuns. Revin cu un răspuns în cel mult 24 de ore. Dacă e urgent, sună direct
          la{' '}
          <a href="tel:+40741591252" className="text-gold hover:underline">
            0741 591 252
          </a>
          .
        </p>
      </div>
    )
  }

  const sending = state === 'sending'

  return (
    <div className="border-t border-border p-8 md:p-12 lg:border-t-0 lg:border-l">
      <p className="text-xs tracking-[0.25em] text-gold uppercase">Scrie-mi</p>
      <p className="mt-3 text-sm text-muted">
        Completează în 30 de secunde. Răspund în maxim 24 de ore.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Honeypot: bots fill hidden fields, humans never see this one. */}
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />
        <input
          type="hidden"
          name="_subject"
          value="Solicitare nouă de pe cheftiberiucsiszer.github.io"
        />

        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs text-muted">
            Nume <span className="text-gold">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Numele tău"
            className="field"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs text-muted">
              Email <span className="text-gold">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="nume@exemplu.ro"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-xs text-muted">
              Telefon <span className="text-[#6b6b6b]">(opțional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="07xx xxx xxx"
              className="field"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="mb-1.5 block text-xs text-muted">
            Tip solicitare <span className="text-gold">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="field"
          >
            <option value="" disabled>
              Alege…
            </option>
            {requestTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-xs text-muted">
            Detalii <span className="text-[#6b6b6b]">(opțional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Dată, locație, număr de persoane, buget orientativ — orice ajută."
            className="field resize-y"
          />
        </div>

        {state === 'error' && (
          <p role="alert" className="text-sm text-[#ff6b6b]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={sending}
          className="bg-gold-gradient inline-flex w-full justify-center rounded-full px-6 py-3 text-sm font-semibold text-black transition disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {sending ? 'Se trimite…' : 'Trimite mesajul'}
        </button>

        <p className="text-xs text-muted">
          Datele ajung direct pe emailul lui Chef Tiberiu. Fără liste de marketing.
        </p>
      </form>
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center">
        <div>
          <Logo className="h-14 w-auto" />
          <p className="mt-2 max-w-md text-sm text-muted">
            Executive Chef · consultant openings & kitchen development · Food & Beverage · team
            leadership.
          </p>
          <p className="mt-3 text-sm text-gold/80 italic">„You reap what you sow."</p>
        </div>
        <div className="text-sm text-muted md:text-right">
          <p>© {new Date().getFullYear()} Tiberiu Csiszer</p>
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 md:justify-end">
            <a href="tel:+40741591252" className="hover:text-gold">
              0741 591 252
            </a>
            <a
              href="mailto:chef_tiberiu13@yahoo.ro"
              className="hover:text-gold"
            >
              chef_tiberiu13@yahoo.ro
            </a>
            <a
              href="https://www.instagram.com/cheftiberiucsiszer/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gold"
            >
              Instagram
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-svh bg-bg text-fg">
      <Nav />
      <main>
        <Hero />
        <Proof />
        <Stats />
        <About />
        <Services />
        <Process />
        <Experience />
        <Competitions />
        <Gallery />
        <Media />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
