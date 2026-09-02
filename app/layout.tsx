import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://politicalprofile-12-axis.pav-re.chatgpt.site'),
  title: 'PoliticalProfile',
  description: 'A 12-axis political profile with 192 questions. Private by design.',
  openGraph: {
    title: 'PoliticalProfile',
    description: '12 axes. 192 questions. Your profile — private by design.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PoliticalProfile',
    description: '12 axes. 192 questions. Your profile — private by design.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
