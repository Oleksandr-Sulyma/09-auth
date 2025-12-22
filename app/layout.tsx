import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import { SITE_NAME, BASE_URL, OG_IMAGE } from '@/lib/constants/seo';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: SITE_NAME,
  description: 'Simple and efficient note management application.',
  openGraph: {
    title: SITE_NAME,
    description: 'Simple and efficient note management application.',
    url: BASE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
    type: 'website',
  },
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>
              {children}
              {modal}
            </main>
            <Footer />
            <Toaster position="top-right" reverseOrder={false} />
          </AuthProvider>
        </TanStackProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
