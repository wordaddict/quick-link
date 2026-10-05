import type { Metadata } from 'next';
import './globals.css';

const title = 'CCI DMV | Welcome Home';
const description =
  'Announcements, service information, giving, and ways to connect with Celebration Church International DMV.';

export const metadata: Metadata = {
  metadataBase: new URL('https://cci-dmv-hub.abuzz-shell-5491.chatgpt.site'),
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Welcome home to CCI DMV' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
