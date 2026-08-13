"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CurtainIntroOverlay from "./components/CurtainIntroOverlay";
import Footer from "./components/Footer";
import { useLanguage, Lang } from "./hooks/useLanguage";

const translations = {
  en: {
    navHome: "Home",
    navCatalogues: "Catalogues",
    navFurniture: "Furniture Service",
    navAbout: "About",
    navContact: "Contact Us",
    heroTitle: "Transform your view with custom Blinds & Curtains",
    heroDesc: "Discover the perfect blend of style, privacy, and light control with our meticulously crafted window treatments, tailored to your unique space.",
    heroExplore: "EXPLORE CATALOGUE",
    heroRightTitle: "READY TO IMPROVE",
    heroRightSubtitle: "YOUR HOME ?",
    heroRightDescStart: "Seg",
    heroRightDescEnd: " Blinds is the premier source for all types of window treatments, including solar shades and custom wood blinds.",
    heroContactUs: "CONTACT US",
    ourCollections: "OUR COLLECTIONS",
    collections: {
      rollerShades: "ROLLER SHADES",
      romanShades: "ROMAN SHADES",
      panelShades: "PANEL SHADES",
      sheerElegance: "SHEER ELEGANCE",
      verticalBlinds: "VERTICAL BLINDS",
      woodBlinds: "WOOD BLINDS",
      awnings: "AWNINGS"
    },
    showroomBadge: "WE COME TO YOU",
    showroomTitle: "The Mobile Showroom",
    showroomDesc: "Experience our extensive collection in the comfort of your own home. With over 7,000 samples, our design experts will help you find the perfect match for your lighting and decor.",
    showroomBook: "BOOK A VISIT",
    furnitureTitle: "Furniture Services",
    furnitureDesc: "Beyond window treatments, we breathe new life into your cherished furniture. Our expert artisans provide meticulous upholstery and restoration services, ensuring comfort and quality that lasts.",
    furnitureCTA: "Explore Restoration Services",
    footerQuickLinks: "Quick Links",
    footerCollections: "Collections",
    footerFurnitureServices: "Furniture Services",
    footerBookVisit: "Book a Visit",
    footerContact: "Contact",
    footerRights: "All rights reserved."
  },
  es: {
    navHome: "Inicio",
    navCatalogues: "Catálogos",
    navFurniture: "Servicio de Muebles",
    navAbout: "Nosotros",
    navContact: "Contáctanos",
    heroTitle: "Transforma tu vista con Cortinas y Persianas a la medida",
    heroDesc: "Descubre la combinación perfecta de estilo, privacidad y control de luz con nuestros tratamientos para ventanas hechos a la medida de tu espacio.",
    heroExplore: "EXPLORAR CATÁLOGO",
    heroRightTitle: "¿LISTO PARA MEJORAR",
    heroRightSubtitle: "TU HOGAR?",
    heroRightDescStart: "Seg",
    heroRightDescEnd: " Blinds es su mejor opción para todo tipo de cortinas y persianas, incluyendo mallas solares y persianas de madera a la medida.",
    heroContactUs: "CONTÁCTANOS",
    ourCollections: "NUESTRAS COLECCIONES",
    collections: {
      rollerShades: "PERSIANAS ENROLLABLES",
      romanShades: "PERSIANAS ROMANAS",
      panelShades: "PANEL JAPONÉS",
      sheerElegance: "SHEER ELEGANCE",
      verticalBlinds: "PERSIANAS VERTICALES",
      woodBlinds: "PERSIANAS DE MADERA",
      awnings: "TOLDOS"
    },
    showroomBadge: "VAMOS A TU HOGAR",
    showroomTitle: "El Showroom Móvil",
    showroomDesc: "Experimenta nuestra amplia colección desde la comodidad de tu hogar. Con más de 7,000 muestras, nuestros expertos en diseño te ayudarán a encontrar la opción perfecta.",
    showroomBook: "RESERVAR UNA VISITA",
    furnitureTitle: "Servicios de Muebles",
    furnitureDesc: "Más allá de las cortinas y persianas, le damos nueva vida a sus muebles más preciados. Nuestros artesanos expertos ofrecen servicios meticulosos de tapicería y restauración.",
    furnitureCTA: "Explorar Servicios de Tapicería",
    footerQuickLinks: "Enlaces Rápidos",
    footerCollections: "Colecciones",
    footerFurnitureServices: "Servicio de Muebles",
    footerBookVisit: "Reservar Visita",
    footerContact: "Contacto",
    footerRights: "Todos los derechos reservados."
  }
};

export default function Home() {
  const [lang, setLang] = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  
  const headerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const t = translations[lang];

  const changeLanguage = (newLang: Lang) => {
    setLang(newLang);
    setLangOpen(false);
  };

  const currentCollections = [
    { href: "/collection/roller-shades", img: "/assets/images/collection_blinds.jpg", title: t.collections.rollerShades },
    { href: "/collection/roman-shades", img: "/assets/images/collection_roman_shades.jpg", title: t.collections.romanShades },
    { href: "/collection/panel-shades", img: "/assets/images/collection_drapes.jpg", title: t.collections.panelShades },
    { href: "/collection/sheer-elegance", img: "/assets/images/collection_curtains.jpg", title: t.collections.sheerElegance },
    { href: "/collection/vertical-blinds", img: "/assets/images/collection_shutters.jpg", title: t.collections.verticalBlinds },
    { href: "/collection/wood-blinds", img: "/assets/images/collection_motorized.jpg", title: t.collections.woodBlinds },
    { href: "/collection/awnings", img: "/assets/images/collection_outdoor.jpg", title: t.collections.awnings },
  ];

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

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Sticky Header Effect
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 20) {
          headerRef.current.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        } else {
          headerRef.current.style.boxShadow = 'none';
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Infinite Carousel Logic (Safari Compatible, 100% Smooth Subpixel Index Alignment)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let autoPlayInterval: NodeJS.Timeout;
    let scrollSettlingTimeout: NodeJS.Timeout;
    let targetScrollLeft: number | null = null;
    const cards = track.querySelectorAll<HTMLElement>('.collection-card');
    const totalOriginal = currentCollections.length;

    // Exact card + gap step using offsetLeft distance between adjacent cards
    const getCardWidth = () => {
      if (cards.length >= 2 && cards[1] && cards[0]) {
        return cards[1].offsetLeft - cards[0].offsetLeft;
      }
      return cards[0] ? cards[0].offsetWidth + 16 : 300;
    };

    const getSetWidth = () => {
      const step = getCardWidth();
      return step * totalOriginal;
    };

    const setWidth = getSetWidth();
    if (track.scrollLeft === 0) {
      track.scrollLeft = setWidth;
    }

    const checkInfiniteBoundary = () => {
      const step = getCardWidth();
      const currentIndex = Math.round(track.scrollLeft / step);
      
      if (currentIndex >= totalOriginal * 2) {
        const newIndex = currentIndex - totalOriginal;
        track.scrollLeft = newIndex * step;
        targetScrollLeft = track.scrollLeft;
      } else if (currentIndex <= Math.floor(totalOriginal * 0.4)) {
        const newIndex = currentIndex + totalOriginal;
        track.scrollLeft = newIndex * step;
        targetScrollLeft = track.scrollLeft;
      }
      track.style.scrollSnapType = 'x mandatory';
    };

    const scrollByAmount = (direction: 'next' | 'prev') => {
      const step = getCardWidth();

      if (targetScrollLeft === null || Math.abs(track.scrollLeft - targetScrollLeft) > step * 3) {
        targetScrollLeft = track.scrollLeft;
      }

      if (direction === 'next') {
        targetScrollLeft += step;
      } else {
        targetScrollLeft -= step;
      }

      track.style.scrollSnapType = 'none';
      track.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });

      clearTimeout(scrollSettlingTimeout);
      scrollSettlingTimeout = setTimeout(() => {
        checkInfiniteBoundary();
        targetScrollLeft = null;
      }, 500);
    };

    const nextBtn = document.getElementById('carouselNext');
    const prevBtn = document.getElementById('carouselPrev');

    const handleNextClick = (e: MouseEvent) => {
      e.preventDefault();
      scrollByAmount('next');
      resetAutoPlay();
    };

    const handlePrevClick = (e: MouseEvent) => {
      e.preventDefault();
      scrollByAmount('prev');
      resetAutoPlay();
    };

    if (nextBtn) nextBtn.addEventListener('click', handleNextClick);
    if (prevBtn) prevBtn.addEventListener('click', handlePrevClick);

    const startAutoPlay = () => {
      autoPlayInterval = setInterval(() => scrollByAmount('next'), 3200);
    };

    const stopAutoPlay = () => {
      clearInterval(autoPlayInterval);
    };

    const resetAutoPlay = () => {
      stopAutoPlay();
      startAutoPlay();
    };

    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);

    startAutoPlay();

    return () => {
      stopAutoPlay();
      clearTimeout(scrollSettlingTimeout);
      if (nextBtn) nextBtn.removeEventListener('click', handleNextClick);
      if (prevBtn) prevBtn.removeEventListener('click', handlePrevClick);
      track.removeEventListener('mouseenter', stopAutoPlay);
      track.removeEventListener('mouseleave', startAutoPlay);
    };
  }, []);

  return (
    <>
      <CurtainIntroOverlay />
      {/* Sticky Header */}
      <header className="site-header" ref={headerRef}>
        <div className="container header-container">
          <Link href="/" className="brand-logo-group">
            <img className="brand-mark-img logo-img" src="/assets/images/sega_emblem_transparent.png" 
                 alt="Sega Blinds & Curtains Logo" />
            <span className="brand-name">Seg<span className="logo-a">a</span> Blinds & Curtains</span>
          </Link>
          <nav className="main-nav">
            <ul>
              <li><Link href="/">{t.navHome}</Link></li>
              <li className="nav-dropdown-wrapper">
                <Link href="/catalogues">{t.navCatalogues}</Link>
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
              <li><Link href="/furniture-services">{t.navFurniture}</Link></li>
              <li><Link href="/about">{t.navAbout}</Link></li>
              <li><Link href="/contact" className="btn-solid">{t.navContact}</Link></li>
              
              {/* Language Selector Dropdown */}
              <li className="lang-selector-wrapper" ref={dropdownRef}>
                <div 
                  className="lang-selector" 
                  onClick={() => setLangOpen(!langOpen)}
                >
                  {lang === 'en' ? 'ENG' : 'ESP'} 
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                {langOpen && (
                  <div className="lang-dropdown">
                    <button 
                      className={lang === 'en' ? 'active' : ''} 
                      onClick={() => changeLanguage('en')}
                    >
                      ENG (English)
                    </button>
                    <button 
                      className={lang === 'es' ? 'active' : ''} 
                      onClick={() => changeLanguage('es')}
                    >
                      ESP (Español)
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="page-wrapper">
        
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container hero-container">
            
            {/* Combined White Card */}
            <div className="hero-combined-card reveal">
              <div className="hero-left">
                <h1 className="hero-title">{t.heroTitle}</h1>
                <p className="hero-desc">{t.heroDesc}</p>
                <Link href="/catalogues" className="btn-black">{t.heroExplore}</Link>
              </div>

              <div className="hero-middle">
                <img src="/assets/images/hero_middle.png" alt="Luxury Interior with Blinds" className="hero-image" />
              </div>
            </div>

            {/* Right Brown Card */}
            <div className="hero-right reveal reveal-delay-1">
              <div className="hero-right-content">
                <h2 className="hero-right-title">{t.heroRightTitle}<br />{t.heroRightSubtitle}</h2>
                <p className="hero-right-desc">{t.heroRightDescStart}<span className="logo-a">a</span>{t.heroRightDescEnd}</p>
              </div>
              <Link href="/contact" className="btn-white">{t.heroContactUs}</Link>
            </div>
            
          </div>
        </section>

        {/* Section 1: Our Collections */}
        <section className="section collections-section" id="collections">
          <div className="container">
            <h2 className="section-title-bebas reveal">{t.ourCollections}</h2>
            
            <div className="carousel-wrapper reveal reveal-delay-1">
              <button className="carousel-nav prev-btn" id="carouselPrev" aria-label="Previous Collection">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              
              <div className="carousel-track" id="carouselTrack" ref={trackRef}>
                {[...currentCollections, ...currentCollections, ...currentCollections].map((item, idx) => (
                  <Link key={idx} href={item.href} className="collection-card">
                    <img src={item.img} alt={item.title} loading="lazy" />
                    <div className="card-overlay"></div>
                    <h3 className="card-title">{item.title}</h3>
                  </Link>
                ))}
              </div>
              
              <button className="carousel-nav next-btn" id="carouselNext" aria-label="Next Collection">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: The Mobile Showroom */}
        <section className="section mobile-showroom-section">
          <div className="container">
            <div className="mobile-showroom-card">
              <div className="showroom-content reveal">
                <div className="badge-pill">
                  <svg className="badge-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                  </svg>
                  <span>{t.showroomBadge}</span>
                </div>
                
                <h2 className="showroom-title">{t.showroomTitle}</h2>
                
                <p className="showroom-desc">{t.showroomDesc}</p>
                
                <Link href="/contact" className="btn-primary">{t.showroomBook}</Link>
              </div>
              
              <div className="showroom-image-wrapper hover-zoom-wrapper reveal reveal-delay-1">
                <img className="hover-zoom" src="/assets/images/mobile_showroom.png" 
                     alt="The Mobile Showroom interior consultation with sample books" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Furniture Services */}
        <section className="section furniture-services-section">
          <div className="container">
            <div className="furniture-grid">
              <div className="furniture-image-wrapper hover-zoom-wrapper reveal">
                <img className="hover-zoom" src="/assets/images/furniture_sofa.png" 
                     alt="Luxury upholstered beige tufted sofa" loading="lazy" />
              </div>
              
              <div className="furniture-content reveal reveal-delay-1">
                <h2 className="furniture-title">{t.furnitureTitle}</h2>
                
                <p className="furniture-desc">{t.furnitureDesc}</p>
                
                <Link href="/furniture-services" className="link-cta">
                  <span>{t.furnitureCTA}</span>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Extended Footer */}
        <footer className="footer-banner">
          <div className="container footer-container">
            <div className="footer-grid reveal">
              <div className="brand-logo-group footer-logo">
                <img className="brand-mark-img logo-img" src="/assets/images/sega_emblem_transparent.png" 
                     alt="Sega Blinds & Curtains Logo Mark" />
                <span className="brand-name">Seg<span className="logo-a">a</span> Blinds & Curtains</span>
              </div>
              <div className="footer-links">
                <h4>{t.footerQuickLinks}</h4>
                <ul>
                  <li><Link href="/catalogues">{t.footerCollections}</Link></li>
                  <li><Link href="/furniture-services">{t.footerFurnitureServices}</Link></li>
                  <li><Link href="/contact">{t.footerBookVisit}</Link></li>
                </ul>
              </div>
              <div className="footer-contact">
                <h4>{t.footerContact}</h4>
                <p>123 Design Avenue<br />Interior City, IC 10023</p>
                <p>hello@segablinds.com</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 Seg<span className="logo-a">a</span> Blinds & Curtains. {t.footerRights}</p>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}
