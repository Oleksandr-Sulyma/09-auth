import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider'; // Імпортуємо наш провайдер

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub - Simple and Efficient Note Management',
  description:
    'NoteHub is an efficient application for managing personal notes, built with Next.js and TanStack Query.',
  openGraph: {
    title: 'NoteHub - Simple and Efficient Note Management',
    description:
      'NoteHub is an efficient application for managing personal notes, built with Next.js and TanStack Query.',
    // Оновіть URL на актуальний для 9-го ДЗ після деплою
    url: `https://09-auth-your-username.vercel.app/`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Simple and Efficient Note Management',
      },
    ],
    type: 'website',
  },
};

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
          {/* AuthProvider всередині TanStackProvider, але зовні всього іншого */}
          <AuthProvider>
            <Header />
            <main>
              {children}
              {modal}
            </main>
            <Footer />
          </AuthProvider>
        </TanStackProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
