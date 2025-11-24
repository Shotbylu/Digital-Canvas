import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Lungelo Sibisi | Digital Marketing Specialist',
  description: 'Portfolio of Lungelo Sibisi, a Digital Marketing Specialist specializing in SEO, paid social, and data-driven campaigns.',
  openGraph: {
    title: 'Lungelo Sibisi | Digital Marketing Specialist',
    description: 'Converting Ad spend into revenue. Explore my portfolio of high-impact digital campaigns.',
    type: 'website',
    locale: 'en_ZA',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        {/* MEDIUM FIX #5: Resource hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
