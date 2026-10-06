import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'PhoenixAI Studio — HR AI Agent',
  description: 'Your AI-powered HR companion for the modern workplace.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}