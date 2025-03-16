import './globals.css';
import './fonts.css';  
import './fixed-fonts.css';
import { SignatureProvider } from '../contexts/SignatureContext';

export const metadata = {
  title: 'Email Signature Generator',
  description: 'Generate on-brand email signatures',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Inline font loading - more reliable for deployment */}
        <style jsx global>{`
          @font-face {
            font-family: 'CustomFont';
            src: url('https://cdn.jsdelivr.net/gh/brenmiranda/nemo-email@main/fonts/Rena.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
          
          @font-face {
            font-family: 'CustomFontBold';
            src: url('https://cdn.jsdelivr.net/gh/brenmiranda/nemo-email@main/fonts/Rena.woff2') format('woff2');
            font-weight: bold;
            font-style: normal;
            font-display: swap;
          }
          
          .signature-wrapper {
            font-family: 'CustomFont', -apple-system, BlinkMacSystemFont, sans-serif;
          }
          
          .name-text {
            font-family: 'CustomFontBold', -apple-system, BlinkMacSystemFont, sans-serif;
            font-weight: bold;
          }
        `}</style>
      </head>
      <body>
        <SignatureProvider>
          {children}
        </SignatureProvider>
      </body>
    </html>
  );
}
