"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { useLanguage, Lang } from "../hooks/useLanguage";
type Category = 'all' | 'shades' | 'blinds' | 'outdoor';

interface CatalogueItem {
  slug: string;
  img: string;
  category: Category;
  title: { en: string; es: string };
  desc: { en: string; es: string };
  badge: { en: string; es: string };
  isFeatured?: boolean;
}

const cataloguesList: CatalogueItem[] = [
  {
    slug: "roller-shades",
    img: "/assets/images/cat_roller_shades.png",
    category: "shades",
    title: { en: "Roller Shades", es: "Persianas Enrollables" },
    desc: { en: "Budget-wise, easy-care solar protection with heavy-duty metal rollers and continuous loop clutch tension.", es: "Protección solar accesible de fácil cuidado con tubo metálico reforzado y clutch de precisión." },
    badge: { en: "Continuous Loop Clutch", es: "Clutch de Precisión" }
  },
  {
    slug: "roman-shades",
    img: "/assets/images/cat_roman_shades.png",
    category: "shades",
    title: { en: "Roman Shades", es: "Persianas Romanas" },
    desc: { en: "Classic teardrop cascading folds offering soft drapery luxury with optional blackout linings.", es: "Clásicos pliegues en cascada que brindan lujo de cortina con forros blackout opcionales." },
    badge: { en: "Cascading Folds", es: "Pliegues en Cascada" }
  },
  {
    slug: "panel-shades",
    img: "/assets/images/cat_panel_shades.png",
    category: "shades",
    title: { en: "Panel Shades", es: "Panel Japonés" },
    desc: { en: "Versatile sliding fabric panels for large patio doors and room partitions with top pelmet fascia.", es: "Paneles deslizantes versátiles para ventanales grandes y divisiones con galería embellecedora." },
    badge: { en: "Multi-Track Glide", es: "Riel Multicanal" }
  },
  {
    slug: "sheer-elegance",
    img: "/assets/images/cat_sheer_elegance.png",
    category: "shades",
    title: { en: "Sheer Elegance", es: "Sheer Elegance" },
    desc: { en: "The interplay of light with dual-layer sheer vanes and solid privacy bands.", es: "El juego de luz con bandas traslúcidas de doble capa y franjas sólidas de privacidad." },
    badge: { en: "Dual Fabric Vanes", es: "Bandas de Doble Capa" }
  },
  {
    slug: "vertical-blinds",
    img: "/assets/images/cat_vertical_blinds.png",
    category: "blinds",
    title: { en: "Vertical Blinds", es: "Persianas Verticales" },
    desc: { en: "180° rotating louvers with quiet wheeled aluminum track systems for wide openings.", es: "Tabletas giratorias a 180° con rieles de ruedas silenciosos para ventanales anchos." },
    badge: { en: "180° Rotation", es: "Giro de 180°" }
  },
  {
    slug: "wood-blinds",
    img: "/assets/images/cat_wood_blinds.png",
    category: "blinds",
    title: { en: "Wood Blinds", es: "Persianas de Madera" },
    desc: { en: "100% natural kiln-dried wood in 5 slat sizes with routeless privacy and remote motorization.", es: "Madera 100% natural tratada en 5 tamaños de tabla con opción routeless y control remoto." },
    badge: { en: "100% Natural Wood", es: "Madera 100% Natural" }
  },
  {
    slug: "awnings",
    img: "/assets/images/cat_awnings.png",
    category: "outdoor",
    title: { en: "Awnings", es: "Toldos" },
    desc: { en: "Retractable patio & terrace awnings protecting from sun and heat with automated wind sensors.", es: "Toldos retráctiles para terrazas y patios con sensores automáticos de viento y sol." },
    badge: { en: "Wind & Sun Sensor", es: "Sensor de Viento y Sol" },
    isFeatured: true
  }
];

export default function CataloguesPage() {
  const [lang, setLang] = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const dropdownRef = useRef<HTMLLIElement>(null);

  const changeLanguage = (newLang: Lang) => {
    setLang(newLang);
    setLangOpen(false);
  };

  // Outside click for language dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Scroll Reveal Animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const filteredItems = cataloguesList.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <>
      {/* Header */}
      <header className="site-header" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <div className="container header-container">
          <Link href="/" className="brand-logo-group">
            <img className="brand-mark-img logo-img" src="/assets/images/sega_emblem_transparent.png" alt="Sega Emblem" />
            <span className="brand-name">Seg<span className="logo-a">a</span> Blinds & Curtains</span>
          </Link>
          <nav className="main-nav">
            <ul>
              <li><Link href="/">{lang === 'en' ? 'Home' : 'Inicio'}</Link></li>
              <li className="nav-dropdown-wrapper">
                <Link href="/catalogues" className="active">{lang === 'en' ? 'Catalogues' : 'Catálogos'}</Link>
                <div className="nav-mega-dropdown">
                  <div className="dropdown-grid">
                    <div className="dropdown-column">
                      <span className="dropdown-section-title">{lang === 'en' ? 'Shades & Drapes' : 'Persianas y Cortinas'}</span>
                      <Link href="/collection/roller-shades" className="nav-dropdown-item">
                        <img src="/assets/images/cat_roller_shades.png" alt="" className="dropdown-thumb" />
                        <div>
                          <span className="dropdown-item-title">{lang === 'en' ? 'Roller Shades' : 'Persianas Enrollables'}</span>
                          <span className="dropdown-item-sub">{lang === 'en' ? 'Solar & blackout' : 'Malla solar y blackout'}</span>
                        </div>
                      </Link>
                      <Link href="/collection/roman-shades" className="nav-dropdown-item">
                        <img src="/assets/images/cat_roman_shades.png" alt="" className="dropdown-thumb" />
                        <div>
                          <span className="dropdown-item-title">{lang === 'en' ? 'Roman Shades' : 'Persianas Romanas'}</span>
                          <span className="dropdown-item-sub">{lang === 'en' ? 'Soft cascading folds' : 'Pliegues en cascada'}</span>
                        </div>
                      </Link>
                      <Link href="/collection/panel-shades" className="nav-dropdown-item">
                        <img src="/assets/images/cat_panel_shades.png" alt="" className="dropdown-thumb" />
                        <div>
                          <span className="dropdown-item-title">{lang === 'en' ? 'Panel Shades' : 'Panel Japonés'}</span>
                          <span className="dropdown-item-sub">{lang === 'en' ? 'Sliding patio doors' : 'Puertas corredizas'}</span>
                        </div>
                      </Link>
                      <Link href="/collection/sheer-elegance" className="nav-dropdown-item">
                        <img src="/assets/images/cat_sheer_elegance.png" alt="" className="dropdown-thumb" />
                        <div>
                          <span className="dropdown-item-title">{lang === 'en' ? 'Sheer Elegance' : 'Sheer Elegance'}</span>
                          <span className="dropdown-item-sub">{lang === 'en' ? 'Dual-layer vanes' : 'Bandas de doble capa'}</span>
                        </div>
                      </Link>
                    </div>

                    <div className="dropdown-column">
                      <span className="dropdown-section-title">{lang === 'en' ? 'Blinds & Outdoor' : 'Persianas y Exterior'}</span>
                      <Link href="/collection/vertical-blinds" className="nav-dropdown-item">
                        <img src="/assets/images/cat_vertical_blinds.png" alt="" className="dropdown-thumb" />
                        <div>
                          <span className="dropdown-item-title">{lang === 'en' ? 'Vertical Blinds' : 'Persianas Verticales'}</span>
                          <span className="dropdown-item-sub">{lang === 'en' ? '180° louver rotation' : 'Giro a 180°'}</span>
                        </div>
                      </Link>
                      <Link href="/collection/wood-blinds" className="nav-dropdown-item">
                        <img src="/assets/images/cat_wood_blinds.png" alt="" className="dropdown-thumb" />
                        <div>
                          <span className="dropdown-item-title">{lang === 'en' ? 'Wood Blinds' : 'Persianas de Madera'}</span>
                          <span className="dropdown-item-sub">{lang === 'en' ? '100% natural wood' : 'Madera 100% natural'}</span>
                        </div>
                      </Link>
                      <Link href="/collection/awnings" className="nav-dropdown-item">
                        <img src="/assets/images/cat_awnings.png" alt="" className="dropdown-thumb" />
                        <div>
                          <span className="dropdown-item-title">{lang === 'en' ? 'Awnings' : 'Toldos'}</span>
                          <span className="dropdown-item-sub">{lang === 'en' ? 'Retractable patio protection' : 'Protección retráctil'}</span>
                        </div>
                      </Link>

                      <div className="dropdown-view-all">
                        <Link href="/catalogues" className="dropdown-view-all-btn">
                          {lang === 'en' ? 'View All Catalogues →' : 'Ver Todos los Catálogos →'}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li><Link href="/furniture-services">{lang === 'en' ? 'Furniture Service' : 'Servicio de Muebles'}</Link></li>
              <li><Link href="/about">{lang === 'en' ? 'About' : 'Nosotros'}</Link></li>
              <li><Link href="/contact" className="btn-solid">{lang === 'en' ? 'Contact Us' : 'Contáctanos'}</Link></li>
              
              <li className="lang-selector-wrapper" ref={dropdownRef}>
                <div className="lang-selector" onClick={() => setLangOpen(!langOpen)}>
                  {lang === 'en' ? 'ENG' : 'ESP'}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                {langOpen && (
                  <div className="lang-dropdown">
                    <button className={lang === 'en' ? 'active' : ''} onClick={() => changeLanguage('en')}>ENG (English)</button>
                    <button className={lang === 'es' ? 'active' : ''} onClick={() => changeLanguage('es')}>ESP (Español)</button>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="page-wrapper catalogues-page-wrapper" style={{ paddingTop: '85px' }}>
        
        {/* Background Watermark */}
        <img src="/assets/images/sega_emblem_transparent.png" alt="" className="catalogues-watermark" />

        {/* Catalogues Hero Header */}
        <section className="catalogues-hero-section">
          <div className="container">
            <div className="catalogues-accent-line reveal"></div>
            <h1 className="catalogues-page-title reveal">
              {lang === 'en' ? 'Our Collections' : 'Nuestras Colecciones'}
            </h1>
            <p className="catalogues-page-subtitle reveal reveal-delay-1">
              {lang === 'en'
                ? 'Discover our curated selection of high-quality window treatments designed to bring comfort, style, and perfect light control to your home.'
                : 'Descubre nuestra selección curada de persianas y cortinas de alta calidad diseñadas para brindar comodidad, estilo y control de luz a tu hogar.'}
            </p>

            {/* Filter Tabs */}
            <div className="catalogue-filter-tabs reveal reveal-delay-2">
              <button 
                className={`tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                {lang === 'en' ? 'All Collections' : 'Todas las Colecciones'}
              </button>
              <button 
                className={`tab-btn ${activeCategory === 'shades' ? 'active' : ''}`}
                onClick={() => setActiveCategory('shades')}
              >
                {lang === 'en' ? 'Shades' : 'Cortinas & Enrollables'}
              </button>
              <button 
                className={`tab-btn ${activeCategory === 'blinds' ? 'active' : ''}`}
                onClick={() => setActiveCategory('blinds')}
              >
                {lang === 'en' ? 'Blinds' : 'Persianas'}
              </button>
              <button 
                className={`tab-btn ${activeCategory === 'outdoor' ? 'active' : ''}`}
                onClick={() => setActiveCategory('outdoor')}
              >
                {lang === 'en' ? 'Outdoor' : 'Exterior'}
              </button>
            </div>

          </div>
        </section>

        {/* Catalogues Grid Section */}
        <section className="section catalogues-grid-section" style={{ padding: '20px 0 80px' }}>
          <div className="container">
            
            {/* Main Product Grid */}
            <div className="catalogue-grid-3">
              {filteredItems.map((item) => (
                <Link 
                  key={item.slug} 
                  href={`/collection/${item.slug}`} 
                  className={`catalogue-card reveal ${item.isFeatured && activeCategory === 'all' ? 'full-width-card' : ''}`}
                >
                  <div className="catalogue-card-image">
                    <img src={item.img} alt={item.title[lang]} loading="lazy" />
                    <span className="card-minimal-badge">{item.badge[lang]}</span>
                  </div>
                  <div className="catalogue-card-content">
                    <h2 className="catalogue-card-title">{item.title[lang]}</h2>
                    <p className="catalogue-card-desc">{item.desc[lang]}</p>
                    <span className="card-explore-link">
                      <span>{lang === 'en' ? 'View Details' : 'Ver Detalles'}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* Mobile Showroom Banner */}
        <section className="section mobile-showroom-section">
          <div className="container">
            <div className="mobile-showroom-card reveal">
              <div className="showroom-content">
                <div className="badge-pill">
                  <span>{lang === 'en' ? 'WE COME TO YOU' : 'VAMOS A TU HOGAR'}</span>
                </div>
                <h2 className="showroom-title">{lang === 'en' ? 'The Mobile Showroom' : 'El Showroom Móvil'}</h2>
                <p className="showroom-desc">
                  {lang === 'en'
                    ? 'Experience our full catalogue in the comfort of your home. We bring 7,000+ fabric & material samples directly to your doorstep.'
                    : 'Experimenta nuestro catálogo completo desde la comodidad de tu hogar. Llevamos más de 7,000 muestras a tu puerta.'}
                </p>
                <Link href="/contact" className="btn-primary">{lang === 'en' ? 'BOOK A VISIT' : 'RESERVAR VISITA'}</Link>
              </div>
              <div className="showroom-image-wrapper">
                <img src="/assets/images/mobile_showroom.png" alt="Mobile Showroom" />
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="footer-banner">
        <div className="container footer-container">
          <div className="footer-grid">
            <div className="brand-logo-group footer-logo">
              <img className="brand-mark-img logo-img" src="/assets/images/sega_emblem_transparent.png" alt="Logo" />
              <span className="brand-name">Seg<span className="logo-a">a</span> Blinds & Curtains</span>
            </div>
            <div className="footer-links">
              <h4>{lang === 'en' ? 'Quick Links' : 'Enlaces Rápidos'}</h4>
              <ul>
                <li><Link href="/catalogues">{lang === 'en' ? 'Catalogues' : 'Catálogos'}</Link></li>
                <li><Link href="/furniture-services">{lang === 'en' ? 'Furniture Services' : 'Servicio de Muebles'}</Link></li>
                <li><Link href="/contact">{lang === 'en' ? 'Book a Visit' : 'Reservar Visita'}</Link></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h4>{lang === 'en' ? 'Contact' : 'Contacto'}</h4>
              <p>123 Design Avenue<br />Interior City, IC 10023</p>
              <p>hello@segablinds.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Seg<span className="logo-a">a</span> Blinds & Curtains. {lang === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
