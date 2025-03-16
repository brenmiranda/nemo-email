import './globals.css';
import './fonts.css';
import './fixed-fonts.css'; // Add this new file
import { SignatureProvider } from '../contexts/SignatureContext';
import FontLoader from '../components/FontLoader';

export const metadata = {
  title: 'Email Signature Generator',
  description: 'Generate on-brand email signatures',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preload fonts to avoid flash of unstyled text */}
        <link
          rel="preload"
          href="/fonts/RenaVF-pre-redraw.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <SignatureProvider>
          <FontLoader />
          {children}
        </SignatureProvider>
      </body>
    </html>
  );
}
