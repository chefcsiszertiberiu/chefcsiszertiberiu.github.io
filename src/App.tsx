import { useEffect, useState } from 'react'

/** Works on localhost + GitHub Pages base path */
const img = (file: string) =>
  `${import.meta.env.BASE_URL}images/${file.replace(/^\/?images\//, '')}`

const nav = [
  { href: '#despre', label: 'Despre' },
  { href: '#experienta', label: 'Experiență' },
  { href: '#servicii', label: 'Servicii' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#media', label: 'Media' },
  { href: '#contact', label: 'Contact' },
]

const stats = [
  { value: '25+', label: 'Ani în bucătărie' },
  { value: '3', label: 'Țări · RO · DE · BE' },
  { value: '#2', label: 'Best Chef IPA' },
  { value: '5000', label: 'Persoane · eveniment BE' },
]

const services = [
  {
    title: 'Openings & Kitchen Development',
    text: 'Deschideri de restaurant, flux bucătărie, echipamente, standarde de producție.',
  },
  {
    title: 'Consultanță F&B',
    text: 'Refresh concept, meniu sezonier scurt și de top, cost food, amprenta bucătarului.',
  },
  {
    title: 'Training & Leadership',
    text: 'Formare echipe, ierarhie de brigadă, ritm de serviciu, transfer de meserie.',
  },
  {
    title: 'Evenimente & Show Cooking',
    text: 'Catering select, show culinar, jurizare, prezentări de produs și media.',
  },
]

const gallery = [
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
  { src: img('media-interview.jpg'), alt: 'Interviu media' },
  { src: img('bilancia.jpg'), alt: 'Bilancia · parteneriate culinare' },
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

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkCls = scrolled
    ? 'text-muted hover:text-gold'
    : 'text-white/90 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-border/50 bg-bg/90 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
        <a
          href="#top"
          className={`font-display text-xl tracking-wide transition ${
            scrolled ? 'text-fg' : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
          }`}
        >
          TIBERIU <span className="text-gold">CSISZER</span>
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
        </nav>

        <button
          type="button"
          className={scrolled ? 'text-fg md:hidden' : 'text-white md:hidden'}
          aria-label="Meniu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
        </button>
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
  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden pb-16 pt-24 md:pb-20"
    >
      {/* Full-bleed presentation photo — onetiu-style */}
      <div className="absolute inset-0">
        <img
          src={img('about.jpg')}
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full scale-105 object-cover object-[68%_center] md:object-[72%_center] lg:object-[75%_center]"
        />
        {/* Left text veil */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-transparent md:from-bg/95 md:via-bg/70 md:to-transparent lg:via-bg/55" />
        {/* Bottom fade into site */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40" />
        {/* Soft vignette right */}
        <div className="absolute inset-0 bg-gradient-to-l from-bg/50 via-transparent to-transparent md:from-bg/30" />
        {/* Gold ambient glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(232,163,23,0.12),transparent_55%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5">
        <div className="max-w-xl lg:max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 text-xs font-medium tracking-[0.28em] text-gold uppercase">
            <span className="inline-block h-px w-8 bg-gold" />
            Executive Chef · Consultant Culinar
          </p>

          <h1 className="font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] tracking-wide text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
            TIBERIU
            <br />
            <span className="text-gold-gradient">CSISZER</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
            Experiență internațională. Openings de bucătărie, meniuri cu amprentă, training de
            brigadă și show cooking — Mediaș · Germania · Belgia.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="https://wa.me/40741591252"
              target="_blank"
              rel="noreferrer"
              className="bg-gold-gradient rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide text-black shadow-[0_8px_30px_rgba(232,163,23,0.35)] transition hover:brightness-110"
            >
              Rezervă o discuție
            </a>
            <a
              href="#galerie"
              className="rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm text-white backdrop-blur-sm transition hover:border-gold hover:text-gold"
            >
              Vezi portofoliu
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/55">
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
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#despre"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-white/45 uppercase transition hover:text-gold"
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
        <h2 className="font-display mt-3 text-4xl tracking-wide md:text-5xl">SERVICII</h2>
        <div className="section-line mt-4 h-px w-24" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => (
            <article key={s.title} className="card-premium rounded-2xl p-6 md:p-8">
              <span className="font-display text-3xl text-gold/40">0{i + 1}</span>
              <h3 className="mt-3 font-display text-2xl tracking-wide">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
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
        <p className="text-xs tracking-[0.25em] text-gold uppercase">Portofoliu vizual</p>
        <h2 className="font-display mt-3 text-4xl tracking-wide md:text-5xl">GALERIE</h2>
        <div className="section-line mt-4 h-px w-24" />
        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {gallery.map((g) => (
            <figure
              key={g.src}
              className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border"
            >
              <img src={g.src} alt={g.alt} className="w-full object-cover transition duration-500 hover:scale-[1.03]" loading="lazy" />
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
              <p>
                <span className="text-muted">Telefon · </span>
                <a href="tel:+40741591252" className="text-gold hover:underline">
                  0741 591 252
                </a>
              </p>
              <p>
                <span className="text-muted">WhatsApp · </span>
                <a
                  href="https://wa.me/40741591252"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold hover:underline"
                >
                  0741 591 252
                </a>
              </p>
              <p>
                <span className="text-muted">Email · </span>
                <a
                  href="mailto:chef_tiberiu13@yahoo.ro"
                  className="text-gold hover:underline"
                >
                  chef_tiberiu13@yahoo.ro
                </a>
              </p>
              <p>
                <span className="text-muted">Instagram · </span>
                <a
                  href="https://www.instagram.com/cheftiberiucsiszer/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold hover:underline"
                >
                  @cheftiberiucsiszer
                </a>
              </p>
              <p>
                <span className="text-muted">LinkedIn · </span>
                <a
                  href="https://ro.linkedin.com/in/csiszer-tiberiu-49095a36"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold hover:underline"
                >
                  Csiszer Tiberiu
                </a>
              </p>
              <p>
                <span className="text-muted">Locație · </span>
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
          <img
            src={img('spit-roast.jpg')}
            alt="Chef Tiberiu la eveniment outdoor"
            className="min-h-[280px] w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center">
        <div>
          <p className="font-display text-xl tracking-wide">
            TIBERIU <span className="text-gold">CSISZER</span>
          </p>
          <p className="mt-2 max-w-md text-sm text-muted">
            Executive Chef · consultant openings & kitchen development · Food & Beverage · team
            leadership.
          </p>
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
        <Experience />
        <Services />
        <Gallery />
        <Media />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
