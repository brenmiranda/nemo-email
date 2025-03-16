import './globals.css';
import { SignatureProvider } from '../contexts/SignatureContext';
import FontLoader from '../components/FontLoader';

export const metadata = {
  title: 'Email Signature Generator',
  description: 'Generate on-brand email signatures',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SignatureProvider>
          <FontLoader />
          {children}
        </SignatureProvider>
      </body>
    </html>
  );
}
