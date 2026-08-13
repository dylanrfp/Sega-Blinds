"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Footer from "../../components/Footer";
import { useLanguage, Lang } from "../../hooks/useLanguage";

interface ProductDetail {
  slug: string;
  img: string;
  category: string;
  title: { en: string; es: string };
  tagline: { en: string; es: string };
  desc: { en: string; es: string };
  specs: {
    lightControl: { en: string; es: string };
    materials: { en: string; es: string };
    operation: { en: string; es: string };
    idealFor: { en: string; es: string };
  };
  features: { en: string[]; es: string[] };
}

const productData: Record<string, ProductDetail> = {
  "roller-shades": {
    slug: "roller-shades",
    img: "/assets/images/cat_roller_shades.png",
    category: "Shades",
    title: { en: "Roller Shades", es: "Persianas Enrollables" },
    tagline: { en: "Budget-wise, easy-care solar protection with heavy-duty metal rollers.", es: "Protección solar accesible de fácil cuidado con tubo metálico reforzado." },
    desc: {
      en: "Sega Roller Shades provide a budget-wise, easy-care solution for bedrooms, bathrooms, family rooms, and sun porches. Available in sheer weaves, decorative fabrics, vinyl, and mylar to increase energy efficiency and protect furnishings from harmful rays of sunlight. Mounted on heavy-duty metal rollers that will not warp, powered by precision clutch systems that preserve tension for years.",
      es: "Nuestras Persianas Enrollables Sega brindan una solución accesible y de fácil cuidado para recámaras, baños y terrazas. Disponibles en mallas solares, telas decorativas y vinil para aumentar la eficiencia energética y proteger sus muebles contra rayos UV. Montadas en tubos metálicos reforzados que no se deforman y clutch de alta precisión."
    },
    specs: {
      lightControl: { en: "Sheer Solar Weaves to 100% Total Blackout", es: "Malla Solar Traslúcida a 100% Blackout Total" },
      materials: { en: "Solar Screen, Decorative Fabrics, Vinyl, Mylar", es: "Malla Solar, Telas Decorativas, Vinil, Mylar" },
      operation: { en: "Continuous Loop Metal Clutch, Heavy-Duty Roller, Remote Control Motorized", es: "Clutch Metálico de Circuito Continuo, Tubo Reforzado, Motorizado con Control Remoto" },
      idealFor: { en: "Bedrooms, Bathrooms, Family Rooms, Sun Porches", es: "Recámaras, Baños, Salas Familiares, Terrazas" }
    },
    features: {
      en: ["Heavy-duty metal roller tube that will not warp", "Precision clutch mechanism maintains smooth tension", "Wide range of sheer weaves, solar screen & vinyl fabrics", "Increases energy efficiency & protects interior furnishings"],
      es: ["Tubo metálico reforzado que nunca se deforma", "Mecanismo de clutch de precisión que mantiene la tensión", "Amplia gama de mallas solares, telas decorativas y vinil", "Aumenta la eficiencia energética y protege muebles"]
    }
  },
  "roman-shades": {
    slug: "roman-shades",
    img: "/assets/images/cat_roman_shades.png",
    category: "Shades",
    title: { en: "Roman Shades", es: "Persianas Romanas" },
    tagline: { en: "Classic teardrop cascading folds offering soft drapery luxury.", es: "Clásicos pliegues en cascada que brindan lujo de cortina." },
    desc: {
      en: "Experience the softness and luxury of Sega Roman Shades. Featuring a classic teardrop style with supple folds that give a dimensional, cascading appearance. Crafted from premium designer fabrics with classical workroom construction and optional room-darkening blackout linings for customized light control.",
      es: "Viva la suavidad y el lujo de las Persianas Romanas Sega. Destacan por su estilo clásico con pliegues en cascada que brindan profundidad dimensional y sofisticación. Elaboradas con telas de diseñador de primera calidad y forros blackout opcionales."
    },
    specs: {
      lightControl: { en: "Soft Ambient Filtered Light to Blackout Privacy", es: "Luz Ambiental Difusa a Privacidad Blackout" },
      materials: { en: "Premium Fabrics, Natural Linen, Fine Jacquards", es: "Telas de Primera Calidad, Lino, Jacquards" },
      operation: { en: "Cordless Child-Safe Lift, Remote Control Motorized", es: "Elevación Inalámbrica Segura para Niños, Motorizado con Control Remoto" },
      idealFor: { en: "Dining Rooms, Master Bedrooms, Formal Parlors", es: "Comedores, Recámaras Principales, Salas Formales" }
    },
    features: {
      en: ["Classic teardrop cascading folds for dimensional appearance", "Handcrafted designer fabric workroom construction", "Optional high-performance blackout & insulating linings", "Combines soft drapery aesthetics with functional shade operation"],
      es: ["Pliegues en cascada clásicos para una apariencia dimensional", "Construcción artesanal con telas de diseñador", "Forros opcionales de oscurecimiento térmico y blackout", "Combina la estética de cortina con la función de persiana"]
    }
  },
  "panel-shades": {
    slug: "panel-shades",
    img: "/assets/images/cat_panel_shades.png",
    category: "Shades",
    title: { en: "Panel Shades", es: "Panel Japonés" },
    tagline: { en: "Versatile sliding fabric panels for large windows & room dividers.", es: "Paneles deslizantes versátiles para ventanales grandes y divisiones." },
    desc: {
      en: "Sega Panel Shades are an elegant, versatile shading solution for larger windows, sliding patio doors, and room dividers. Panels stack neatly behind one another to maximize room light when open. Operated via smooth wand with one-way, center-draw, or split configurations, and protected by a top pelmet fascia as standard.",
      es: "El Panel Japonés de Sega es una solución elegante y versátil para ventanales grandes, puertas corredizas de patio y divisiones de espacios. Los paneles se apilan ordenadamente permitiendo la máxima entrada de luz. Operado por varilla suave con galería embellecedora superior incluida de fábrica."
    },
    specs: {
      lightControl: { en: "Solar Sunscreen, Light Filtering, Blockout", es: "Malla Solar, Filtro de Luz, Bloqueo Total" },
      materials: { en: "Multi-channel Aluminum Track, Heavy Woven Fabrics", es: "Riel de Aluminio Multicanal, Paneles de Tela" },
      operation: { en: "Smooth Wand Drive, One-Way or Center Split", es: "Varilla de Deslizamiento Suave, Apertura Lateral o Central" },
      idealFor: { en: "Sliding Patio Doors, Large Picture Windows, Room Partitions", es: "Puertas Corredizas, Ventanales Grandes, Divisor de Espacios" }
    },
    features: {
      en: ["Neat panel stacking maximizes incoming light", "Custom panel widths from 400mm to 1100mm (500-750mm ideal)", "Includes top pelmet fascia as standard to conceal brackets", "Multiple draw configurations: One-way, center, or split"],
      es: ["Apilamiento ordenado que maximiza la entrada de luz", "Ancho de panel personalizado de 400mm a 1100mm", "Galería superior embellecedora incluida de fábrica", "Múltiples opciones de apertura: Un sentido o al centro"]
    }
  },
  "sheer-elegance": {
    slug: "sheer-elegance",
    img: "/assets/images/cat_sheer_elegance.png",
    category: "Shades",
    title: { en: "Sheer Elegance", es: "Sheer Elegance" },
    tagline: { en: "Dual-layer fabric bands combining sheer drapes & light control.", es: "Bandas de doble capa que combinan velo traslúcido y privacidad." },
    desc: {
      en: "Sega Sheer Elegance works like a blind and a sheer drape without the bulk. Trim, clean lines take up less window space while providing a beautiful interplay of light. Fabric vanes can be adjusted open or closed for a full spectrum of light diffusion and private coverage.",
      es: "Sheer Elegance de Sega funciona como una persiana y un velo traslúcido combinados sin abultar. Sus líneas estilizadas ocupan menos espacio y brindan un juego de luz hermoso. Las bandas se ajustan abiertas o cerradas para un espectro completo de luz y privacidad."
    },
    specs: {
      lightControl: { en: "Adjustable Fabric Vanes Light Spectrum Control", es: "Control Gradual de Luz con Bandas Ajustables" },
      materials: { en: "Sheer Classic & Room-Darkening Fabric Vanes", es: "Bandas Traslúcidas y de Oscurecimiento" },
      operation: { en: "Continuous Loop Chain, Motorized Option", es: "Cadena de Circuito Continuo, Opción Motorizada" },
      idealFor: { en: "Bedrooms, Living Rooms, Executive Offices", es: "Recámaras, Salas de Estar, Oficinas Ejecutivas" }
    },
    features: {
      en: ["Combines sheer drape soft aesthetics with blind functionality", "Trim clean lines require minimal window depth", "Adjustable fabric vanes for precision light control", "Enclosed color-matched cassette headbox included"],
      es: ["Combina la estética suave de velo con la practicidad de persiana", "Diseño estilizado que requiere mínima profundidad", "Ajuste de bandas para control de luz preciso", "Casete superior cerrado integrado al tono"]
    }
  },
  "vertical-blinds": {
    slug: "vertical-blinds",
    img: "/assets/images/cat_vertical_blinds.png",
    category: "Blinds",
    title: { en: "Vertical Blinds", es: "Persianas Verticales" },
    tagline: { en: "180° louver rotation with quiet wheeled track systems.", es: "Tabletas giratorias a 180° con rieles silenciosos de suave deslizamiento." },
    desc: {
      en: "Vertical Blinds are the standard choice for sliding glass doors and wide windows, providing exceptional light control and privacy. Individual slats rotate 180° and slide smoothly along Sega's durable, high-quality wheeled aluminum track system. Optional 3-1/2″ vertical blind valance or custom wood cornice adds a finished architectural touch.",
      es: "Las Persianas Verticales son la elección estándar para puertas corredizas y ventanales. Las tabletas giran 180° y se desplazan suavemente en el riel de aluminio con ruedas reforzado de Sega. Opción de galería de 3-1/2″ o cornisa de madera real."
    },
    specs: {
      lightControl: { en: "Full 180° Slat Tilt Directional Shading", es: "Giro Direccional de Tabletas a 180°" },
      materials: { en: "Textured Fabric Louvers, Embossed PVC", es: "Tabletas de Tela Texturizada, PVC Grabado" },
      operation: { en: "High-Quality Wheeled Aluminum Track System, Safety Wand", es: "Riel de Aluminio con Ruedas de Alto Rendimiento, Varilla" },
      idealFor: { en: "Sliding Glass Doors, Wide Windows, Offices", es: "Puertas Corredizas de Terraza, Ventanales Anchos, Oficinas" }
    },
    features: {
      en: ["180-degree individual louver rotation for exact privacy", "Durable wheeled track system for quiet, smooth operation", "Optional 3-1/2″ valance or custom wood cornice fascia", "Low-maintenance, easy-to-clean materials for high traffic"],
      es: ["Giro individual de tabletas a 180° para privacidad exacta", "Sistema de riel con ruedas reforzado para operación silenciosa", "Galería opcional de 3-1/2″ o cornisa de madera real", "Materiales de bajo mantenimiento y fácil limpieza"]
    }
  },
  "wood-blinds": {
    slug: "wood-blinds",
    img: "/assets/images/cat_wood_blinds.png",
    category: "Blinds",
    title: { en: "Wood Blinds", es: "Persianas de Madera" },
    tagline: { en: "100% natural kiln-dried wood in 5 slat sizes with remote control.", es: "Madera 100% natural en 5 tamaños de tabla con control remoto." },
    desc: {
      en: "Crafted from 100% natural kiln-dried wood, Sega Wood Blinds bring organic warmth and timeless luxury. Available in 5 slat sizes (from 1\" up to 3\" wide), smooth or textured finishes, decorative cloth tapes, and routeless privacy options that eliminate cord holes to block light leaks. Full remote control motorization available.",
      es: "Elaboradas con madera 100% natural tratada en horno, las Persianas de Madera Sega ofrecen calidez orgánica y lujo intemporal. Disponibles en 5 tamaños de tabla (de 1\" a 3\"), acabados lisos o texturizados, cintas decorativas y opción routeless sin perforaciones para máximo bloqueo de luz."
    },
    specs: {
      lightControl: { en: "Routeless Hole-Free Slat Privacy & Slat Tilt", es: "Sistema Routeless Sin Perforaciones e Inclinación" },
      materials: { en: "100% Natural Kiln-Dried Wood, Smooth or Textured", es: "Madera 100% Natural Tratada en Horno, Lisa o Texturizada" },
      operation: { en: "Wand/Cord Tilt, Side-Specific Controls, Remote Motorized", es: "Varilla/Cordón, Controles Laterales, Control Remoto" },
      idealFor: { en: "Living Rooms, Executive Libraries, Master Suites", es: "Salas de Estar, Bibliotecas Ejecutivas, Recámaras" }
    },
    features: {
      en: ["5 slat widths from 1\" wide up to 3\" wide slats", "Over 7,000 custom stain & paint color matching samples", "Routeless option eliminates cord holes for total light block", "Optional remote control motorized operation & cloth tapes"],
      es: ["5 anchos de tabla desde 1\" hasta 3\" pulgadas", "Más de 7,000 muestras con igualado de color personalizado", "Opción routeless sin perforaciones para bloqueo de luz", "Operación motorizada con control remoto y cintas decorativas"]
    }
  },
  "awnings": {
    slug: "awnings",
    img: "/assets/images/cat_awnings.png",
    category: "Outdoor",
    title: { en: "Awnings", es: "Toldos" },
    tagline: { en: "Retractable terrace protection with automated wind & sun sensors.", es: "Protección retráctil para terrazas con sensores de viento y sol." },
    desc: {
      en: "Expand your outdoor living space with Sega Awnings. Designed for terraces, gardens, and patios, our retractable folding awnings protect against harsh sun and heat while maintaining open garden views. Available with manual cranks or automated wind and sun retraction sensors.",
      es: "Amplíe su espacio al aire libre con los Toldos Sega. Diseñados para terrazas, jardines y patios, nuestros toldos retráctiles protegen contra el calor y el sol manteniendo la vista hacia el jardín. Disponibles con manivela manual o motores automáticos con sensores de viento y sol."
    },
    specs: {
      lightControl: { en: "100% Outdoor Heat & UV Radiation Shield", es: "100% Protección Exterior Contra Sol, Viento y Calor" },
      materials: { en: "Heavy-Duty Outdoor Canvas, Corrosion-Resistant Powder Frame", es: "Lona Exterior de Alta Resistencia, Estructura Anticorrosiva" },
      operation: { en: "Retractable Hand Crank, Automated Wind & Sun Sensors", es: "Manivela Retráctil, Sensores Automáticos de Viento y Sol" },
      idealFor: { en: "Terraces, Outdoor Dining Decks, Gardens, Patios", es: "Terrazas, Comedores de Jardín, Balcones, Patios" }
    },
    features: {
      en: ["Extends usable outdoor terrace hours comfortably", "Retractable folding arm mechanisms for flexible shade", "Automated wind & sun sensors for auto-retraction safety", "Water-repellent & fade-resistant outdoor acrylic fabrics"],
      es: ["Extiende las horas de disfrute en terrazas al aire libre", "Mecanismo retráctil de brazos invisibles para sombra flexible", "Sensores automáticos de sol y viento para auto-protección", "Lonas acrílicas hidrófugas resistentes a la intemperie"]
    }
  }
};

const swatches = [
  { name: "Cream Linen", hex: "#E8E2D5" },
  { name: "Oatmeal Warm", hex: "#D6C9B3" },
  { name: "Natural Slate", hex: "#9E9991" },
  { name: "Charcoal Black", hex: "#2E2D2B" },
  { name: "Pure Snow", hex: "#F5F5F0" }
];

export default function ProductDetailPage() {
  const params = useParams();
  const slug = (params.slug as string) || "roller-shades";
  const [lang, setLang] = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [selectedSwatch, setSelectedSwatch] = useState(0);

  const product = productData[slug] || productData["roller-shades"];
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
  }, [slug]); // Re-run when slug changes so new elements are observed

  return (
    <>
      {/* Site Header */}
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

      <main className="page-wrapper" style={{ paddingTop: '40px' }}>
        
        {/* Back Link & Breadcrumb */}
        <section className="section" style={{ padding: '0px 0 5px' }}>
          <div className="container">
            <Link href="/catalogues" className="back-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>{lang === 'en' ? 'Back to Catalogues' : 'Volver a Catálogos'}</span>
            </Link>
          </div>
        </section>

        {/* Product Detail Main Hero Grid */}
        <section className="section" style={{ padding: '0px 0 20px' }}>
          <div className="container">
            <div className="product-detail-grid">
              
              {/* Product Hero Image */}
              <div className="product-detail-media reveal">
                <img src={product.img} alt={product.title[lang]} className="product-main-img" />
                <span className="product-category-badge">{product.category}</span>
              </div>

              {/* Product Overview Content */}
              <div className="product-detail-info">
                <h1 className="product-detail-title reveal">{product.title[lang]}</h1>
                <p className="product-detail-tagline reveal reveal-delay-1">{product.tagline[lang]}</p>
                
                <p className="product-detail-desc reveal reveal-delay-1">{product.desc[lang]}</p>

                {/* Specs Box */}
                <div className="specs-card reveal reveal-delay-2">
                  <h3 className="specs-title">{lang === 'en' ? 'Technical Specifications' : 'Especificaciones Técnicas'}</h3>
                  
                  <div className="spec-row">
                    <span className="spec-label">{lang === 'en' ? 'Light Control:' : 'Control de Luz:'}</span>
                    <span className="spec-value">{product.specs.lightControl[lang]}</span>
                  </div>

                  <div className="spec-row">
                    <span className="spec-label">{lang === 'en' ? 'Materials:' : 'Materiales:'}</span>
                    <span className="spec-value">{product.specs.materials[lang]}</span>
                  </div>

                  <div className="spec-row">
                    <span className="spec-label">{lang === 'en' ? 'Operation:' : 'Operación:'}</span>
                    <span className="spec-value">{product.specs.operation[lang]}</span>
                  </div>

                  <div className="spec-row">
                    <span className="spec-label">{lang === 'en' ? 'Ideal For:' : 'Ideal Para:'}</span>
                    <span className="spec-value">{product.specs.idealFor[lang]}</span>
                  </div>
                </div>

                {/* Swatch Sample Palette */}
                <div className="swatches-wrapper reveal reveal-delay-3">
                  <span className="swatches-label">{lang === 'en' ? 'Sample Color Tone:' : 'Tono de Muestra:'} <strong>{swatches[selectedSwatch].name}</strong></span>
                  <div className="swatch-list">
                    {swatches.map((swatch, i) => (
                      <button
                        key={i}
                        className={`swatch-btn ${selectedSwatch === i ? 'active' : ''}`}
                        style={{ backgroundColor: swatch.hex }}
                        onClick={() => setSelectedSwatch(i)}
                        title={swatch.name}
                      />
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="product-actions reveal reveal-delay-3">
                  <Link href="/contact" className="btn-solid-lg">
                    {lang === 'en' ? 'Book In-Home Visit' : 'Reservar Visita a Domicilio'}
                  </Link>
                  <a href="tel:+18005557342" className="btn-outline-lg">
                    {lang === 'en' ? 'Call Specialist' : 'Llamar a un Especialista'}
                  </a>
                </div>

              </div>
            </div>

            {/* Features Key Points */}
            <div className="features-section reveal" style={{ marginTop: '70px' }}>
              <h2 className="features-heading">{lang === 'en' ? 'Key Features & Benefits' : 'Características Principales'}</h2>
              <div className="features-grid">
                {product.features[lang].map((feat, idx) => (
                  <div key={idx} className="feature-card">
                    <div className="feature-check-icon">✓</div>
                    <p>{feat}</p>
                  </div>
                ))}
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
