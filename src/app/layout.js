import './globals.css';
import './fonts.css';  
import { SignatureProvider } from '../contexts/SignatureContext';

export const metadata = {
  title: 'NEMO Signature Generator',
  description: '-',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SignatureProvider>
          {children}
        </SignatureProvider>
      </body>
    </html>
  );
}
