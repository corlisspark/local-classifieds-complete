import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import {
  I18nProvider,
  QueryProvider,
  ThemeProvider,
  ToastProvider,
} from './providers';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Local Classifieds',
  description: 'Local classifieds and service marketplace platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${inter.variable} font-sans antialiased`}>
        <I18nProvider>
          <QueryProvider>
            <ThemeProvider>
              <ToastProvider>{children}</ToastProvider>
            </ThemeProvider>
          </QueryProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
