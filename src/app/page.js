'use client';

import Link from 'next/link';
import SignatureForm from '../components/SignatureForm';
import SignaturePreview from '../components/SignaturePreview';
import FontDebug from '../components/FontDebug';

export default function Home() {
  return (
    <div className="container">
      <div className="app-header">
        <h1>NEMO Signature Generator</h1>
        <p>Create your email signature here.</p>
        
        <div className="nav-links">
          <Link href="/">Generator</Link>
          <Link href="/admin">Style Settings</Link>
        </div>
      </div>
      
      <div className="main-layout">
        <SignatureForm />
        <SignaturePreview />
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <FontDebug />
      </div>
    </div>
  );
}
