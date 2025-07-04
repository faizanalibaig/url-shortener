import type { Metadata } from 'next';
import { Pathway_Extreme } from 'next/font/google';
import './globals.css';

const pathwayExtreme = Pathway_Extreme({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Url Shortener',
  description: 'A simple URL shortener application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={pathwayExtreme.className}>{children}</body>
    </html>
  );
}
