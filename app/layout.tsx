import Navigation from '@/components/Navigation';
import './globals.css';

export const metadata = {
  title: 'BeomHui`s PrototypeHub',
  description: 'developed by BeomHui',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
