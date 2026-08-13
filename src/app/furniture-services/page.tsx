"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useLanguage, Lang } from "../hooks/useLanguage";

export default function FurnitureServicesPage() {
  const [lang, setLang] = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (newLang: Lang) => {
    setLang(newLang);
    setLangOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Sticky Header */}
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
                <Link href="/catalogues">{lang === 'en' ? 'Catalogues' : 'Catálogos'}</Link>
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
              <li><Link href="/furniture-services" className="active">{lang === 'en' ? 'Furniture Service' : 'Servicio de Muebles'}</Link></li>
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

      <main className="furniture-ref-page">
        {/* Background Watermark */}
        <img src="/assets/images/sega_emblem_transparent.png" alt="" className="catalogues-watermark" />
        
        {/* 1. Hero Section */}
        <section className="f-hero-section">
          <div className="f-container f-hero-grid">
            <div className="f-hero-text reveal fade-in">
              <h1>
                {lang === 'en' 
                  ? 'Masterful Furniture Restoration & Upholstery' 
                  : 'Restauración y Tapicería Magistral de Muebles'}
              </h1>
              <p>
                {lang === 'en' 
                  ? 'Expert upholstery and restoration for residential furniture, automotive interiors, marine vessels and more. Professional, on-site services tailored for demanding businesses and private clients.' 
                  : 'Tapicería y restauración experta para muebles residenciales, interiores automotrices, embarcaciones marinas y más. Servicios profesionales en el lugar, adaptados para clientes exigentes.'}
              </p>
              <Link href="/contact" className="f-btn-contact f-btn-contact-large">
                <span>{lang === 'en' ? 'REQUEST FURNITURE QUOTE' : 'SOLICITAR COTIZACIÓN DE MUEBLES'}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
            <div className="f-hero-image-wrap reveal slide-up">
              <img src="/assets/images/furniture_hero.png" alt="Masterful Furniture Restoration" className="f-hero-img" />
            </div>
          </div>
        </section>

        {/* 2. Our Expertise Bento Box Grid */}
        <section className="f-expertise-section">
          <div className="f-container">
            <div className="f-section-title reveal fade-in">
              <h2>{lang === 'en' ? 'Our Expertise' : 'Nuestra Experiencia'}</h2>
              <p>{lang === 'en' ? 'Specialized restoration across domestic, commercial, and highly demanding environments.' : 'Restauración especializada en entornos domésticos, comerciales y de alta demanda.'}</p>
            </div>
            
            <div className="f-bento-grid">
              {/* Card 1: Residential Furniture Image */}
              <div className="f-bento-card f-bento-img reveal slide-up">
                <img src="/assets/images/furniture_residential.png" alt="Residential Furniture" />
                <div className="f-bento-overlay">
                  <h3>{lang === 'en' ? 'Residential Furniture' : 'Mobiliario Residencial'}</h3>
                  <p>{lang === 'en' ? 'Bespoke reupholstery and care for cherished home pieces, ensuring comfort and elegance.' : 'Tapicería y cuidado a medida para piezas del hogar estimadas, garantizando comodidad y elegancia.'}</p>
                </div>
              </div>

              {/* Card 2: Automotive Graphic */}
              <div className="f-bento-card f-bento-light reveal slide-up" style={{ transitionDelay: '0.1s' }}>
                <div className="f-bento-icon-clean">
                  <svg width="32" height="32" viewBox="-3 -1 28 26" fill="none" stroke="#7A4A21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H8c-.7 0-1.3.3-1.8.7C5.3 8.6 4 10 4 10s-2.7.6-4.5 1.1C.7 11.3 0 12.1 0 13v3c0 .6.4 1 1 1h2"/>
                    <circle cx="7" cy="17" r="2"/>
                    <path d="M9 17h6"/>
                    <circle cx="17" cy="17" r="2"/>
                  </svg>
                </div>
                <div className="f-bento-card-body">
                  <h4>{lang === 'en' ? 'Automotive' : 'Automotriz'}</h4>
                  <p>{lang === 'en' ? 'Precision interior restoration for classic and modern vehicles.' : 'Restauración de interiores de precisión para vehículos clásicos y modernos.'}</p>
                </div>
                <div className="f-bento-dec-shape"></div>
              </div>

              {/* Card 3: Commercial Graphic */}
              <div className="f-bento-card f-bento-light reveal slide-up" style={{ transitionDelay: '0.2s' }}>
                <div className="f-bento-icon-clean">
                  <svg width="32" height="32" viewBox="-2 -2 28 28" fill="none" stroke="#7A4A21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
                    <path d="M6 12H4a2 2 0 0 0-2 2v8h4"/>
                    <path d="M18 9h2a2 2 0 0 1 2 2v11h-4"/>
                    <path d="M10 6h4"/>
                    <path d="M10 10h4"/>
                    <path d="M10 14h4"/>
                    <path d="M10 18h4"/>
                  </svg>
                </div>
                <div className="f-bento-card-body">
                  <h4>{lang === 'en' ? 'Commercial & B2B' : 'Comercial y B2B'}</h4>
                  <p>{lang === 'en' ? 'Durable, high-quality servicing for hotels, restaurants, and offices.' : 'Servicio duradero y de alta calidad para hoteles, restaurantes y oficinas.'}</p>
                </div>
              </div>

              {/* Card 4: Marine & Yachts Image */}
              <div className="f-bento-card f-bento-img reveal slide-up" style={{ transitionDelay: '0.3s' }}>
                <img src="/assets/images/furniture_specialty.png" alt="Marine & Yachts" />
                <div className="f-bento-overlay">
                  <h3>{lang === 'en' ? 'Marine & Yachts' : 'Marino y Yates'}</h3>
                  <p>{lang === 'en' ? 'Specialized, weather-resistant restoration for marine environments.' : 'Restauración especializada y resistente a la intemperie para entornos marinos.'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Transformations Section */}
        <section className="f-transform-section">
          <div className="f-container">
            {/* Row 1: Text Left, Dual Before/After Right */}
            <div className="f-transform-row reveal fade-in">
              <div className="f-transform-info">
                <span className="f-badge">{lang === 'en' ? 'Residential Heritage' : 'Patrimonio Residencial'}</span>
                <h2>{lang === 'en' ? 'Reviving the Hearth' : 'Reviviendo el Hogar'}</h2>
                <p>
                  {lang === 'en' 
                    ? 'The home is where memories are forged. Our residential restoration process begins with a deep structural assessment, ensuring that the foundational integrity of your mid-century pieces or classic heirlooms is sound. We utilize traditional hand-tying techniques for springs and source historically accurate textiles, marrying comfort with enduring elegance. The result is not just a repaired chair, but a revitalized cornerstone of your living space.'
                    : 'El hogar es donde se forjan los recuerdos. Nuestro proceso de restauración residencial comienza con una evaluación estructural profunda, asegurando que la integridad fundamental de sus piezas sea sólida. Utilizamos técnicas tradicionales de atado a mano para resortes y obtenemos textiles históricamente precisos, combinando la comodidad con una elegancia duradera.'}
                </p>
              </div>

              <div className="f-transform-pair">
                <div className="f-ba-card">
                  <span className="f-ba-tag f-tag-before">Before</span>
                  <img src="/assets/images/furniture_res_gen_before.png" alt="Before Restoration" />
                </div>
                <div className="f-ba-card">
                  <span className="f-ba-tag f-tag-after">After</span>
                  <img src="/assets/images/furniture_res_gen_after.png" alt="After Restoration" />
                </div>
              </div>
            </div>

            {/* Row 2: Dual Before/After Left, Text Right */}
            <div className="f-transform-row f-row-reverse reveal fade-in">
              <div className="f-transform-info">
                <span className="f-badge">{lang === 'en' ? 'Marine & Yachting' : 'Marina y Yates'}</span>
                <h2>{lang === 'en' ? 'Defying the Elements' : 'Desafiando los Elementos'}</h2>
                <p>
                  {lang === 'en' 
                    ? 'The open water is unforgiving. Salt, sun, and moisture require a level of technical mastery that goes beyond standard upholstery. We source specialized, marine-grade foams and UV-resistant threads. Our process strips away degraded materials, treats the foundational structures for moisture resistance, and meticulously rebuilds the seating to withstand the harshest environments while providing unparalleled luxury.'
                    : 'El agua abierta es implacable. La sal, el sol y la humedad requieren un nivel de dominio técnico que va más allá de la tapicería estándar. Obtenemos espumas especializadas de grado marino e hilos resistentes a los rayos UV. Nuestro proceso elimina materiales degradados, trata las estructuras fundamentales y reconstruye meticulosamente los asientos.'}
                </p>
              </div>

              <div className="f-transform-pair">
                <div className="f-ba-card">
                  <span className="f-ba-tag f-tag-before">Before</span>
                  <img src="/assets/images/furniture_marine_gen_before.png" alt="Marine Before" />
                </div>
                <div className="f-ba-card">
                  <span className="f-ba-tag f-tag-after">After</span>
                  <img src="/assets/images/furniture_marine_gen_after.png" alt="Marine After" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Bottom Call-to-Action Section */}
        <section className="f-bottom-cta-section reveal fade-in">
          <div className="f-container">
            <div className="f-bottom-cta-card">
              <div className="f-cta-border-frame"></div>
              <div className="f-bottom-cta-flex">
                <div className="f-bottom-cta-text">
                  <div className="f-cta-badge-row">
                    <span className="f-badge">{lang === 'en' ? 'Bespoke Consultation' : 'Consulta Personalizada'}</span>
                    <span className="f-cta-line"></span>
                  </div>
                  <h2>
                    {lang === 'en' 
                      ? 'Ready to Revitalize Your Fine Furniture?' 
                      : '¿Listo para Revitalizar sus Muebles de Lujo?'}
                  </h2>
                  <p>
                    {lang === 'en' 
                      ? 'Residential heirlooms, executive fleets, or luxury marine seating—our master craftsmen are ready.' 
                      : 'Reliquias residenciales, flotas ejecutivas o asientos marinos de lujo: nuestros maestros artesanos están listos.'}
                  </p>
                </div>
                <div className="f-bottom-cta-btn-wrap">
                  <Link href="/contact" className="f-btn-contact f-btn-contact-large">
                    <span>{lang === 'en' ? 'REQUEST FURNITURE QUOTE' : 'SOLICITAR COTIZACIÓN'}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Floating CTA Widget */}
        <div className="f-sticky-cta-wrap">
          <Link href="/contact" className="f-sticky-cta-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>{lang === 'en' ? 'Request Furniture Quote' : 'Cotizar Restauración'}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </main>

      {/* Footer Banner (Same as rest of the site) */}
      <footer className="footer-banner">
        <div className="container footer-container">
          <div className="footer-grid reveal">
            <div className="brand-logo-group footer-logo">
              <img className="brand-mark-img logo-img" src="/assets/images/sega_emblem_transparent.png" alt="Sega Blinds & Curtains Logo Mark" />
              <span className="brand-name">Seg<span className="logo-a">a</span> Blinds & Curtains</span>
            </div>
            <div className="footer-links">
              <h4>{lang === 'en' ? 'Quick Links' : 'Enlaces Rápidos'}</h4>
              <ul>
                <li><Link href="/catalogues">{lang === 'en' ? 'Catalogues' : 'Catálogos'}</Link></li>
                <li><Link href="/furniture-services">{lang === 'en' ? 'Furniture Service' : 'Servicio de Muebles'}</Link></li>
                <li><Link href="/contact">{lang === 'en' ? 'Book Visit' : 'Reservar Visita'}</Link></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h4>{lang === 'en' ? 'Contact' : 'Contacto'}</h4>
              <p>123 Design Avenue<br />Interior City, IC 10023</p>
              <p>hello@segablinds.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Seg<span className="logo-a">a</span> Blinds & Curtains. {lang === 'en' ? 'All Rights Reserved.' : 'Todos los Derechos Reservados.'}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
