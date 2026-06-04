import type { Metadata } from 'next';
import { Cormorant_Garamond, Lora } from 'next/font/google';
import { I18nProvider } from '@/lib/i18n/context';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import FloatingCertBadge from '@/components/ui/FloatingCertBadge';
import './globals.css';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dominios de Lujo — Red Editorial de Lujo en Español',
  description:
    'La mayor colección de dominios exactos de lujo en español. Conectamos marcas premium con audiencias de alto poder adquisitivo en España y Latinoamérica.',
  keywords: 'dominios de lujo, luxury domains, spanish luxury, affiliate marketing, luxury editorial',
  openGraph: {
    title: 'Dominios de Lujo',
    description: 'La mayor colección de dominios exactos de lujo en español.',
    siteName: 'Dominios de Lujo',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${lora.variable}`}>
      <body>
        <I18nProvider>
          <Nav />
          <main style={{ paddingTop: '136px' }}>{children}</main>
          <Footer />
          <FloatingCertBadge />
        </I18nProvider>
      </body>
    </html>
  );
}
