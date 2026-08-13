import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sega Blinds & Curtains | Luxury Window Treatments',
  description: 'Sega Blinds & Curtains offers premium custom curtains, blinds, Roman shades, mobile showroom services, and expert furniture upholstery restoration.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Hanken+Grotesk:wght@300;400;500;600;700&family=Literata:ital,opsz,wght@0,7..72,400..700;1,7..72,400..700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
