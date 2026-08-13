'use client';

import React from 'react';
import Link from 'next/link';
import { Lang } from '../hooks/useLanguage';

interface FooterProps {
  lang?: Lang;
}

export default function Footer({ lang = 'en' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-banner">
      <div className="container footer-container">
        
        {/* Main 4-Column Footer Grid */}
        <div className="footer-grid reveal">
          
          {/* Column 1: Brand, Tagline & Service Badge */}
          <div className="footer-col-brand">
            <Link href="/" className="brand-logo-group footer-logo">
              <img 
                className="brand-mark-img logo-img" 
                src="/assets/images/sega_emblem_transparent.png" 
                alt="Sega Blinds & Curtains" 
              />
              <span className="brand-name">
                Seg<span className="logo-a">a</span> Blinds & Curtains
              </span>
            </Link>
            
            <p className="footer-brand-bio">
              {lang === 'en'
                ? 'Bespoke custom blinds, Roman shades, automated drapery, and master furniture upholstery crafted for luxury residences and commercial projects across Banderas Bay.'
                : 'Persianas a medida, cortinas romanas, sistemas automatizados y tapicería artesanal para residencias de lujo y proyectos comerciales en Bahía de Banderas.'}
            </p>

            <div className="footer-badge-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>{lang === 'en' ? 'Puerto Vallarta & Riviera Nayarit' : 'Puerto Vallarta y Riviera Nayarit'}</span>
            </div>
          </div>

          {/* Column 2: Window Treatments & Collections */}
          <div className="footer-col-links">
            <h4>{lang === 'en' ? 'Collections' : 'Colecciones'}</h4>
            <ul>
              <li><Link href="/collection/roller-shades">{lang === 'en' ? 'Roller Shades' : 'Persianas Enrollables'}</Link></li>
              <li><Link href="/collection/roman-shades">{lang === 'en' ? 'Roman Shades' : 'Persianas Romanas'}</Link></li>
              <li><Link href="/collection/sheer-elegance">{lang === 'en' ? 'Sheer Elegance' : 'Sheer Elegance'}</Link></li>
              <li><Link href="/collection/panel-shades">{lang === 'en' ? 'Panel Shades' : 'Panel Japonés'}</Link></li>
              <li><Link href="/collection/wood-blinds">{lang === 'en' ? 'Wood Blinds' : 'Persianas de Madera'}</Link></li>
              <li><Link href="/collection/vertical-blinds">{lang === 'en' ? 'Vertical Blinds' : 'Persianas Verticales'}</Link></li>
              <li><Link href="/collection/awnings">{lang === 'en' ? 'Awnings & Outdoor' : 'Toldos y Exterior'}</Link></li>
              <li><Link href="/furniture-services">{lang === 'en' ? 'Furniture Upholstery' : 'Servicio de Tapicería'}</Link></li>
            </ul>
          </div>

          {/* Column 3: Showroom Location & Operating Hours */}
          <div className="footer-col-location">
            <h4>{lang === 'en' ? 'Showroom & Hours' : 'Showroom y Horario'}</h4>
            
            <div className="footer-address-block">
              <p className="footer-address-title">
                <strong>Francisco Villa 434-A</strong><br />
                <span>Esquina Libramiento, Los Sauces</span><br />
                <span>Puerto Vallarta, Jal. 48330</span>
              </p>
              
              <div className="footer-hours-block">
                <div className="footer-hours-row">
                  <span className="hours-day">{lang === 'en' ? 'Mon – Fri:' : 'Lun – Vie:'}</span>
                  <span className="hours-time">10:00 am – 6:00 pm</span>
                </div>
                <div className="footer-hours-row">
                  <span className="hours-day">{lang === 'en' ? 'Saturday:' : 'Sábado:'}</span>
                  <span className="hours-time">9:00 am – 2:00 pm</span>
                </div>
                <div className="footer-hours-row">
                  <span className="hours-day">{lang === 'en' ? 'Sunday:' : 'Domingo:'}</span>
                  <span className="hours-time">{lang === 'en' ? 'Appointments Only' : 'Previa Cita'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Contact, Mobile Showroom & Direct Links */}
          <div className="footer-col-contact">
            <h4>{lang === 'en' ? 'Contact & Bookings' : 'Contacto y Citas'}</h4>
            
            <div className="footer-contact-items">
              <a href="tel:3223036418" className="footer-contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>322 303 6418</span>
              </a>

              <a 
                href="https://wa.me/523221492322?text=Hello%20Sega%20Blinds,%20I%20would%20like%20to%20inquire%20about%20your%20services." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-contact-link footer-wa-link"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
                </svg>
                <span>WhatsApp: 322 149 2322</span>
              </a>

              <a href="mailto:ventas@segablinds.com" className="footer-contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>ventas@segablinds.com</span>
              </a>
            </div>

            <Link href="/contact" className="footer-book-btn">
              <span>{lang === 'en' ? 'Book In-Home Visit' : 'Reservar Visita a Domicilio'}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>

        </div>

        {/* Bottom Legal & Location Tagline */}
        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {currentYear} Seg<span className="logo-a">a</span> Blinds & Curtains. {lang === 'en' ? 'All Rights Reserved.' : 'Todos los Derechos Reservados.'}
          </p>
          <p className="footer-city-tag">
            {lang === 'en' 
              ? 'Puerto Vallarta • Riviera Nayarit • México' 
              : 'Puerto Vallarta • Riviera Nayarit • México'}
          </p>
        </div>

      </div>
    </footer>
  );
}
