'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';
import { useLanguage, Lang } from "../hooks/useLanguage";

interface ShowroomPhoto {
  src: string;
  titleEn: string;
  titleEs: string;
  subtitleEn: string;
  subtitleEs: string;
}

const SHOWROOM_PHOTOS: ShowroomPhoto[] = [
  {
    src: '/assets/images/showroom_storefront.jpg',
    titleEn: 'Showroom Storefront',
    titleEs: 'Fachada de Nuestra Tienda',
    subtitleEn: 'Francisco Villa 434-A, Puerto Vallarta',
    subtitleEs: 'Francisco Villa 434-A, Puerto Vallarta',
  },
  {
    src: '/assets/images/showroom_displays.jpg',
    titleEn: 'Interactive Shade Displays',
    titleEs: 'Exhibición de Persianas',
    subtitleEn: 'Explore fabrics, textures, and motorization',
    subtitleEs: 'Descubra telas, texturas y motorización',
  },
  {
    src: '/assets/images/showroom_lounge.jpg',
    titleEn: 'Design Lounge & Consultation',
    titleEs: 'Sala de Diseño y Consulta',
    subtitleEn: 'Comfortable spaces for custom styling consultations',
    subtitleEs: 'Espacio exclusivo para asesoría personalizada',
  }
];

export default function ContactPage() {
  const [lang, setLang] = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Leaflet Map Ref
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Initialize interactive Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    let isMounted = true;
    import('leaflet').then((L) => {
      if (!isMounted || !mapContainerRef.current || mapInstanceRef.current) return;

      const position: [number, number] = [20.650893, -105.228122];

      const map = L.map(mapContainerRef.current, {
        center: position,
        zoom: 16,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      // CartoDB Positron Grayscale Tiles (matching design screenshot)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(map);

      // Custom Symmetrical Sega Pin Marker with White Emblem
      const customIcon = L.divIcon({
        className: 'sega-leaflet-marker-wrapper',
        html: `
          <div class="sega-pin-wrapper">
            <div class="sega-pin-bubble">
              <img src="/assets/images/sega_emblem_white.png" class="sega-pin-lion-img" alt="Sega Emblem" />
              <span class="sega-pin-brand-title">Sega</span>
            </div>
            <div class="sega-pin-tip"></div>
            <div class="sega-pin-shadow"></div>
          </div>
        `,
        iconSize: [58, 72],
        iconAnchor: [29, 68],
        popupAnchor: [0, -68],
      });

      const marker = L.marker(position, { icon: customIcon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family: var(--font-sans, sans-serif); padding: 6px 4px; min-width: 200px;">
          <strong style="font-size: 14px; color: #111;">Sega Blinds & Curtains</strong><br/>
          <span style="font-size: 12px; color: #555; display: inline-block; margin-top: 2px;">Av. Francisco Villa 434-A, Puerto Vallarta</span><br/>
          <a href="https://maps.google.com/?q=Av+Francisco+Villa+434-A+Puerto+Vallarta+Jalisco+48330" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 6px; margin-top: 8px; background: #8e623a; color: #ffffff; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 11px; text-decoration: none;">
            Open on Google Maps &rarr;
          </a>
        </div>
      `);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev !== null ? (prev + 1) % SHOWROOM_PHOTOS.length : 0));
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev !== null ? (prev - 1 + SHOWROOM_PHOTOS.length) % SHOWROOM_PHOTOS.length : 0));
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const changeLanguage = (newLang: Lang) => {
    setLang(newLang);
    setLangOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Target trial email & whatsapp
    const trialEmail = 'dylan@sanpancho.com';

    const emailSubject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name || 'Website Visitor'}`);
    const emailBody = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Subject: ${formData.subject}\n\n` +
      `Message:\n${formData.message}`
    );

    // Trigger mailto client
    window.location.href = `mailto:${trialEmail}?subject=${emailSubject}&body=${emailBody}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 400);
  };

  const getWhatsAppUrl = () => {
    const trialWhatsAppPhone = '523221492322';
    const waText = encodeURIComponent(
      `*New Sega Blinds Inquiry*\n\n` +
      `*Name:* ${formData.name || 'N/A'}\n` +
      `*Phone:* ${formData.phone || 'N/A'}\n` +
      `*Email:* ${formData.email || 'N/A'}\n` +
      `*Subject:* ${formData.subject || 'General Inquiry'}\n\n` +
      `*Message:* ${formData.message || 'I would like to inquire about custom blinds and curtains.'}`
    );
    return `https://wa.me/${trialWhatsAppPhone}?text=${waText}`;
  };

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
              <li><Link href="/about">{lang === 'en' ? 'About' : 'Nosotros'}</Link></li>
              <li><Link href="/contact" className="btn-solid active" style={{ backgroundColor: '#775135' }}>{lang === 'en' ? 'Contact Us' : 'Contáctanos'}</Link></li>
              
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

      <main className="contact-page">
        <div className="container contact-container">
          
          {/* Top Hero / Split Section */}
          <section className="contact-hero-section">
            <div className="contact-split-grid">
              
              {/* Left Column: Heading, Coverage & Custom Shaped Dark Card */}
              <div className="contact-left-col reveal">
                <h1 className="contact-heading">
                  {lang === 'en' ? 'CONTACT US' : 'CONTÁCTANOS'}
                </h1>
                
                <p className="contact-intro-text">
                  {lang === 'en' ? (
                    <>
                      Whether you need a quick measurement or a complete home styling consultation, we&apos;re here in <u>Puerto Vallarta</u> and all corners of the area including <u>Nuevo Vallarta</u>, <u>Bucerias</u>, <u>La Cruz de Huanacaxtle</u>, <u>Punta de Mita</u>, <u>Sayulita and Mismaloya</u>. Ready to assist.
                    </>
                  ) : (
                    <>
                      Ya sea que necesite una medición rápida o una consulta completa de diseño para su hogar, estamos aquí en <u>Puerto Vallarta</u> y en todos los rincones de la región, incluidos <u>Nuevo Vallarta</u>, <u>Bucerías</u>, <u>La Cruz de Huanacaxtle</u>, <u>Punta de Mita</u>, <u>Sayulita y Mismaloya</u>. Listos para asistirle.
                    </>
                  )}
                </p>

                {/* Custom Shaped Dark Card with Smooth Continuous Cutout */}
                <div className="contact-shaped-card-container">
                  
                  {/* Single Continuous Vector Card Path */}
                  <svg 
                    className="contact-shaped-card-bg" 
                    viewBox="0 0 540 295" 
                    preserveAspectRatio="none"
                  >
                    <path 
                      d="M 24 0 H 516 A 24 24 0 0 1 540 24 V 95 A 24 24 0 0 1 516 119 H 370 A 45 45 0 0 0 325 164 V 271 A 24 24 0 0 1 301 295 H 24 A 24 24 0 0 1 0 271 V 24 A 24 24 0 0 1 24 0 Z" 
                      fill="#60554b" 
                    />
                  </svg>

                  {/* Card Content */}
                  <div className="contact-shaped-card-content">
                    {/* Top Info: Address & Hours */}
                    <div className="contact-card-top-info">
                      <div className="contact-info-item">
                        <div className="contact-info-icon">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                        </div>
                        <div className="contact-info-content">
                          <div className="contact-address-title">
                            Francisco Villa 434-A Esquina Libramiento, Puerto Vallarta, 48330
                          </div>
                          <div className="contact-hours-list">
                            <div>Monday - Friday 10:00 am - 18:00 pm</div>
                            <div>Saturday 9:00 am - 14:00 pm</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Info: Phone & Email */}
                    <div className="contact-card-bottom-info">
                      <div className="contact-link-row">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="contact-link-icon">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <a href="tel:3223036418" className="contact-link-text">
                          322 303 6418
                        </a>
                      </div>

                      <div className="contact-link-row">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="contact-link-icon">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <a href="mailto:ventas@segablinds.com" className="contact-link-text contact-link-email">
                          ventas@segablinds.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Lion Watermark positioned right in the cutout corner */}
                  <img 
                    src="/assets/images/sega_emblem_transparent.png" 
                    alt="" 
                    className="contact-watermark-cutout" 
                  />

                </div>
              </div>

              {/* Right Column: Bordered Form Card (Offset from Top) */}
              <div className="contact-right-col reveal reveal-delay-1">
                <div className="contact-form-card">
                  <div className="contact-form-header">
                    <p className="contact-form-prompt">
                      {lang === 'en' 
                        ? 'To send an inquiry to the Sega blinds, please complete the form below and Submit' 
                        : 'Para enviar una consulta a Sega Blinds, complete el siguiente formulario y envíelo'}
                    </p>
                    <img 
                      src="/assets/images/sega_emblem_transparent.png" 
                      alt="Sega Lion Emblem" 
                      className="contact-form-lion" 
                    />
                  </div>

                  <form onSubmit={handleSubmit} className="contact-form-body">
                    <div className="contact-field-group">
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={lang === 'en' ? 'Name and/or Company Name' : 'Nombre y/o Empresa'}
                        className="contact-input-underlined"
                        required
                      />
                    </div>

                    <div className="contact-field-group">
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={lang === 'en' ? 'Phone Number' : 'Teléfono'}
                        className="contact-input-underlined"
                        required
                      />
                    </div>

                    <div className="contact-field-group">
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={lang === 'en' ? 'Your E-mail' : 'Su Correo Electrónico'}
                        className="contact-input-underlined"
                        required
                      />
                    </div>

                    <div className="contact-field-group">
                      <input 
                        type="text" 
                        name="subject" 
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder={lang === 'en' ? 'Your Subject' : 'Asunto'}
                        className="contact-input-underlined"
                      />
                    </div>

                    <div className="contact-field-group">
                      <textarea 
                        name="message" 
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={lang === 'en' ? 'Message :' : 'Mensaje :'}
                        className="contact-textarea-underlined"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="contact-form-footer">
                      <button 
                        type="submit" 
                        className="contact-submit-btn"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span>{lang === 'en' ? 'Preparing...' : 'Preparando...'}</span>
                        ) : (
                          <>
                            <span>{lang === 'en' ? 'SUBMIT' : 'ENVIAR'}</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <line x1="22" y1="2" x2="11" y2="13"></line>
                              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                          </>
                        )}
                      </button>

                      <div className="contact-brand-signature">
                        Seg<span className="logo-a">a</span> Blinds
                      </div>
                    </div>

                    {/* Submission notification with instant WhatsApp & Email triggers */}
                    {submitSuccess && (
                      <div className="contact-notification">
                        <strong>
                          {lang === 'en' ? 'Thank you! Your message is ready to send.' : '¡Gracias! Su mensaje está listo para enviarse.'}
                        </strong>
                        <p style={{ margin: 0, fontSize: '0.9rem' }}>
                          {lang === 'en' 
                            ? 'Your email client has been prepared. You can also send this inquiry directly via WhatsApp for immediate response:' 
                            : 'Se ha preparado su cliente de correo. También puede enviar esta consulta directamente por WhatsApp para atención inmediata:'}
                        </p>
                        <div className="contact-notification-buttons">
                          <a 
                            href={getWhatsAppUrl()} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="contact-wa-btn"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
                            </svg>
                            <span>{lang === 'en' ? 'Chat on WhatsApp (322 149 2322)' : 'Enviar por WhatsApp (322 149 2322)'}</span>
                          </a>
                          <button 
                            type="button" 
                            onClick={() => setSubmitSuccess(false)}
                            className="contact-email-btn"
                          >
                            {lang === 'en' ? 'Close' : 'Cerrar'}
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>

            </div>
          </section>

          {/* Section: HOW TO FIND US */}
          <section className="contact-map-section reveal">
            <h2 className="contact-section-heading">
              {lang === 'en' ? 'HOW TO FIND US' : 'CÓMO ENCONTRARNOS'}
            </h2>

            {/* Interactive Leaflet Grayscale Map Container */}
            <div className="contact-map-wrapper">
              <div 
                ref={mapContainerRef} 
                className="contact-map-container-el"
              />

              {/* Sega Pin Badge (Top Right) */}
              <div className="contact-map-badge">
                <img 
                  src="/assets/images/sega_emblem_transparent.png" 
                  alt="Sega Blinds Emblem" 
                  className="contact-map-badge-logo" 
                />
                <div className="contact-map-badge-text">
                  <h4>Seg<span className="logo-a">a</span> Blinds & Curtains</h4>
                  <p>Av. Francisco Villa 434-A, Puerto Vallarta</p>
                </div>
                <a 
                  href="https://maps.google.com/?q=Av+Francisco+Villa+434-A+Puerto+Vallarta+Jalisco+48330" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-map-directions-btn"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span>{lang === 'en' ? 'Open on Google Maps' : 'Abrir en Google Maps'}</span>
                </a>
              </div>
            </div>

            {/* Showroom Photo Trio */}
            <div className="contact-showroom-section">
              <div className="contact-showroom-grid">
                {SHOWROOM_PHOTOS.map((photo, index) => (
                  <div 
                    key={index} 
                    className={`contact-showroom-card reveal reveal-delay-${index + 1}`}
                    onClick={() => setLightboxIndex(index)}
                    title={lang === 'en' ? 'Click to view full photo' : 'Haga clic para ver foto completa'}
                  >
                    <img 
                      src={photo.src} 
                      alt={lang === 'en' ? photo.titleEn : photo.titleEs} 
                      className="contact-showroom-img" 
                    />
                    <div className="contact-showroom-overlay">
                      <div className="contact-showroom-label">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          <line x1="11" y1="8" x2="11" y2="14"></line>
                          <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                        <span>{lang === 'en' ? photo.titleEn : photo.titleEs}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </section>

        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="contact-lightbox-modal" onClick={() => setLightboxIndex(null)}>
          <div className="contact-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="contact-lightbox-close" 
              onClick={() => setLightboxIndex(null)}
              aria-label="Close image"
            >
              &times;
            </button>

            <button 
              className="contact-lightbox-nav contact-lightbox-prev"
              onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + SHOWROOM_PHOTOS.length) % SHOWROOM_PHOTOS.length : 0))}
              aria-label="Previous image"
            >
              &#8249;
            </button>

            <img 
              src={SHOWROOM_PHOTOS[lightboxIndex].src} 
              alt={lang === 'en' ? SHOWROOM_PHOTOS[lightboxIndex].titleEn : SHOWROOM_PHOTOS[lightboxIndex].titleEs}
              className="contact-lightbox-img" 
            />

            <div className="contact-lightbox-caption">
              <h4>{lang === 'en' ? SHOWROOM_PHOTOS[lightboxIndex].titleEn : SHOWROOM_PHOTOS[lightboxIndex].titleEs}</h4>
              <p style={{ fontSize: '0.9rem', color: '#cccccc', margin: '4px 0 0 0' }}>
                {lang === 'en' ? SHOWROOM_PHOTOS[lightboxIndex].subtitleEn : SHOWROOM_PHOTOS[lightboxIndex].subtitleEs}
              </p>
            </div>

            <button 
              className="contact-lightbox-nav contact-lightbox-next"
              onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % SHOWROOM_PHOTOS.length : 0))}
              aria-label="Next image"
            >
              &#8250;
            </button>
          </div>
        </div>
      )}

      {/* Extended Luxury Footer */}
      <Footer lang={lang} />
    </>
  );
}
