import Navigation from '@/components/Layouts/Navigation';
// import { SpeedInsights } from '@vercel/speed-insights/next';
// import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/Layouts/ThemeProvider';
import './globals.css';

export const metadata = {
  title: 'BeomHui`s PrototypeHub',
  description: 'AI Frontend Engineer Portfolio',
  metadataBase: new URL('https://prototypehub.vercel.app'),
  openGraph: {
    title: 'BeomHui`s PrototypeHub',
    description: 'AI Frontend Engineer Portfolio',
    url: 'https://prototypehub.vercel.app',
    siteName: 'PrototypeHub',
    locale: 'ko',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-b from-background to-background/80 antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          {children}
          {/*<SpeedInsights />*/}
          {/*<Analytics />*/}
        </ThemeProvider>
      </body>
    </html>
  );
}
