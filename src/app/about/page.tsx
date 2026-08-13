'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';
import { useLanguage, Lang } from "../hooks/useLanguage";

export default function AboutPage() {
  const [lang, setLang] = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              <li><Link href="/furniture-services">{lang === 'en' ? 'Furniture Service' : 'Servicio de Muebles'}</Link></li>
              <li><Link href="/about" className="active">{lang === 'en' ? 'About' : 'Nosotros'}</Link></li>
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
      
      <main className="about-page">
        {/* Background Watermark */}
        <img src="/assets/images/sega_emblem_transparent.png" alt="" className="about-watermark" />

        {/* Hero Banner */}
        <section className="about-hero-compact">
          <div className="about-hero-pattern">
            <img src="/assets/images/sega_emblem_transparent.png" className="pattern-item item-1" alt="" />
            <img src="/assets/images/sega_emblem_transparent.png" className="pattern-item item-2" alt="" />
            <img src="/assets/images/sega_emblem_transparent.png" className="pattern-item item-3" alt="" />
            <img src="/assets/images/sega_emblem_transparent.png" className="pattern-item item-4" alt="" />
            <img src="/assets/images/sega_emblem_transparent.png" className="pattern-item item-5" alt="" />
            <img src="/assets/images/sega_emblem_transparent.png" className="pattern-item item-6" alt="" />
            <img src="/assets/images/sega_emblem_transparent.png" className="pattern-item item-7" alt="" />
          </div>
          <div className="about-hero-inner">
            <div className="about-hero-title-group">
              <img 
                src="/assets/images/sega_emblem_transparent.png" 
                alt="Sega Emblem" 
                className="about-hero-side-logo"
              />
              <h1>
                {lang === 'en' ? 'About Seg' : 'Acerca de Seg'}<span className="logo-a">a</span>
              </h1>
            </div>
          </div>
        </section>

        {/* Main Content Rows */}
        <section className="about-content-section">
          <div className="f-container">
            {/* Section 1: The Concept */}
            <div className="about-row reveal fade-in">
              <div className="about-info">
                <span className="about-badge-dark">{lang === 'en' ? 'OUR PHILOSOPHY' : 'NUESTRA FILOSOFÍA'}</span>
                <h2>{lang === 'en' ? 'The Sega Blinds Concept' : 'El Concepto Sega Blinds'}</h2>
                <p>
                  {lang === 'en'
                    ? 'The Sega Blinds concept is simple: outstanding quality blinds, custom made to your exact requirements, at the most competitive prices available in Puerto Vallarta, México.'
                    : 'El concepto Sega Blinds es simple: persianas de calidad excepcional, hechas a medida según sus requisitos exactos, a los precios más competitivos en Puerto Vallarta, México.'}
                </p>
                <p>
                  {lang === 'en'
                    ? 'We make no compromises on the outstanding quality of our blinds, nor on our levels of customer service. Rather, we work hard on keeping our overheads low and pass the benefit of lower costs directly to our customers.'
                    : 'No hacemos concesiones en la calidad excepcional de nuestras persianas, ni en nuestros niveles de servicio al cliente. Trabajamos para mantener bajos nuestros costos generales y transferir ese beneficio directamente a nuestros clientes.'}
                </p>
              </div>
              <div className="about-img-box">
                <img src="/assets/images/about_materials.png" alt="Sega Blinds Materials" />
              </div>
            </div>

            {/* Section 2: Global Sourcing & Local Workshops */}
            <div className="about-row about-row-reverse reveal fade-in">
              <div className="about-info">
                <span className="about-badge-dark">{lang === 'en' ? 'CRAFTSMANSHIP' : 'ARTESANÍA'}</span>
                <h2>{lang === 'en' ? 'Global Sourcing & Local Craft' : 'Abastecimiento Global y Taller Local'}</h2>
                <p>
                  {lang === 'en'
                    ? 'All of our bespoke blinds are sourced by our expert buyers, guided by our design team, and manufactured in Mexico and selected global partners. They represent the highest quality available at an excellent value price point.'
                    : 'Todas nuestras persianas a medida son seleccionadas por compradores expertos, guiados por nuestro equipo de diseño, y fabricadas en México y socios globales. Representan la más alta calidad a un excelente precio.'}
                </p>
                <p>
                  {lang === 'en'
                    ? 'Our tailored blinds are sourced from the world\'s finest manufacturers and then hand-finished and tailored right here in our local workshops.'
                    : 'Nuestras persianas a medida provienen de los mejores fabricantes del mundo y luego se terminan a mano en nuestros talleres locales.'}
                </p>
              </div>
              <div className="about-img-box">
                <img src="/assets/images/about_craftsmanship.png" alt="Local Workshop Craftsmanship" />
              </div>
            </div>

            {/* Features Grid: Clean Cards with SVG Icons */}
            <div className="about-features-grid reveal fade-in">
              <div className="about-feature-card">
                <div className="about-feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                </div>
                <h3>{lang === 'en' ? 'Direct Savings' : 'Ahorros Directos'}</h3>
                <p>
                  {lang === 'en'
                    ? 'Low overheads allow us to deliver superior window treatments without inflated markups.'
                    : 'Nuestros bajos costos operativos nos permiten ofrecer productos superiores sin sobreprecios.'}
                </p>
              </div>

              <div className="about-feature-card">
                <div className="about-feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <h3>{lang === 'en' ? 'Free Sample Service' : 'Muestras Gratuitas'}</h3>
                <p>
                  {lang === 'en'
                    ? 'Explore our premium fabrics and textures firsthand with our free in-home sample service.'
                    : 'Conozca nuestras telas y texturas premium de primera mano con nuestro servicio de muestras sin costo.'}
                </p>
              </div>

              <div className="about-feature-card">
                <div className="about-feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <h3>{lang === 'en' ? 'In-Home Comfort' : 'Comodidad en Casa'}</h3>
                <p>
                  {lang === 'en'
                    ? 'Choose the perfect blind from the comfort of your own home with expert guidance.'
                    : 'Elija la persiana perfecta desde la comodidad de su hogar con asesoría experta.'}
                </p>
              </div>
            </div>

            {/* Bottom Call-to-Action Section */}
            <div className="f-bottom-cta-section reveal fade-in" style={{ marginTop: '60px' }}>
              <div className="f-bottom-cta-card" style={{ backgroundColor: '#111111', color: '#ffffff', borderColor: '#111111' }}>
                <div className="f-cta-border-frame" style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}></div>
                <div className="f-bottom-cta-flex">
                  <div className="f-bottom-cta-text">
                    <span className="about-badge-dark" style={{ background: '#ffffff', color: '#111111' }}>{lang === 'en' ? 'READY TO GET STARTED?' : '¿LISTO PARA EMPEZAR?'}</span>
                    <h2 style={{ color: '#ffffff' }}>{lang === 'en' ? 'Transform Your Windows Today' : 'Transforme sus Ventanas Hoy'}</h2>
                    <p style={{ color: '#cccccc' }}>{lang === 'en' ? 'Book a free in-home consultation or request custom samples with our design team.' : 'Reserve una consulta gratuita a domicilio o solicite muestras personalizadas.'}</p>
                  </div>
                  <div className="f-bottom-cta-action">
                    <Link href="/contact" className="f-btn-contact f-btn-contact-large" style={{ backgroundColor: '#ffffff', color: '#111111' }}>
                      <span>{lang === 'en' ? 'BOOK A VISIT' : 'RESERVAR VISITA'}</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Extended Luxury Footer */}
      <Footer lang={lang} />
    </>
  );
}
